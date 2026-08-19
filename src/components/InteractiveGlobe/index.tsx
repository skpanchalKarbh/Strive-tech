'use client'

import React, { useEffect, useRef, useState } from 'react'

interface LocationPin {
  id: string
  title: string
  lat: number
  lng: number
  address: string
  phone?: string
  email?: string
  city: string
  country: string
  flag: string
}

const LOCATIONS: LocationPin[] = [
  {
    id: 'usa-office',
    title: 'USA Office (Headquarters)',
    lat: 39.76,
    lng: -89.69,
    address: '2501 Chatham Rd, STE R Springfield, IL 62704, USA',
    phone: '+1 484 518 1900',
    email: 'Info@strivetechpartners.com',
    city: 'Springfield, IL',
    country: 'USA',
    flag: '🇺🇸',
  },
  {
    id: 'india-office',
    title: 'India Development Center',
    lat: 23.02,
    lng: 72.57,
    address: 'A 601, PNTC, B/H Titanium City Centre, Times Of India Road, Prahladnagar, Ahmedabad, 380015',
    phone: '+91 987 654 3210',
    email: 'Info@strivetechpartners.com',
    city: 'Ahmedabad, Gujarat',
    country: 'India',
    flag: '🇮🇳',
  },
]

// Detailed Land Polygons for realistic continent rendering
const CONTINENT_POLYGONS: Array<Array<[number, number]>> = [
  // North America
  [[70, -165], [72, -140], [70, -100], [60, -75], [48, -65], [44, -64], [30, -80], [25, -80], [25, -97], [18, -105], [14, -92], [8, -83], [10, -77], [15, -90], [25, -105], [32, -117], [48, -125], [60, -140]],
  // USA Mainland
  [[49, -124], [49, -95], [47, -84], [45, -71], [32, -80], [25, -80], [26, -97], [32, -117], [42, -124]],
  // South America
  [[12, -72], [8, -60], [5, -50], [-5, -35], [-18, -38], [-23, -43], [-34, -53], [-45, -65], [-55, -68], [-48, -75], [-18, -72], [-5, -80]],
  // Europe
  [[36, -9], [43, -9], [44, 3], [50, 2], [54, 8], [58, 11], [62, 5], [71, 28], [65, 40], [55, 38], [45, 35], [40, 28], [38, 15], [37, 22]],
  // Africa
  [[37, 10], [32, 32], [22, 37], [12, 44], [11, 51], [-12, 40], [-26, 33], [-34, 25], [-34, 18], [15, -17], [28, -13], [35, -6]],
  // Asia
  [[70, 40], [72, 80], [70, 120], [68, 170], [55, 160], [45, 140], [35, 120], [22, 114], [10, 105], [5, 100], [15, 95], [25, 60], [40, 50], [55, 50]],
  // India Subcontinent
  [[35, 75], [32, 77], [28, 88], [22, 89], [18, 84], [10, 80], [8, 77], [13, 75], [22, 69], [25, 68], [30, 70]],
  // Australia
  [[-12, 130], [-15, 142], [-25, 153], [-37, 140], [-34, 115], [-22, 114], [-15, 125]],
  // Japan
  [[45, 142], [40, 140], [35, 135], [31, 130], [35, 135], [40, 142]],
  // UK
  [[58, -5], [50, -5], [50, 1], [58, 1]],
]

export const InteractiveGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [activeLocation, setActiveLocation] = useState<LocationPin>(LOCATIONS[0])
  const [hoveredLocation, setHoveredLocation] = useState<LocationPin | null>(null)

  const rotationRef = useRef({ y: 0.8, x: 0.3 })
  const targetRotationYRef = useRef<number | null>(null)
  const isDraggingRef = useRef(false)
  const previousMousePositionRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)

  // Starfield background particles
  const starsRef = useRef<Array<{ x: number; y: number; size: number; alpha: number; speed: number }>>([])

  useEffect(() => {
    // Generate 60 background stars
    const stars: Array<{ x: number; y: number; size: number; alpha: number; speed: number }> = []
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * 600,
        y: Math.random() * 460,
        size: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.02 + 0.01,
      })
    }
    starsRef.current = stars
  }, [])

  // Smoothly rotate globe to focus on a location
  const focusLocation = (loc: LocationPin) => {
    setActiveLocation(loc)
    const targetY = -loc.lng * (Math.PI / 180) - Math.PI / 2
    targetRotationYRef.current = targetY
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let pulseTime = 0

    const render = () => {
      pulseTime += 0.025

      // Smooth rotation interpolation
      if (targetRotationYRef.current !== null) {
        let diff = targetRotationYRef.current - rotationRef.current.y
        while (diff < -Math.PI) diff += Math.PI * 2
        while (diff > Math.PI) diff -= Math.PI * 2

        if (Math.abs(diff) < 0.008) {
          rotationRef.current.y = targetRotationYRef.current
          targetRotationYRef.current = null
        } else {
          rotationRef.current.y += diff * 0.08
        }
      } else if (!isDraggingRef.current) {
        rotationRef.current.y += 0.0025
      }

      const width = canvas.width
      const height = canvas.height
      const cx = width / 2
      const cy = height / 2
      const radius = Math.min(width, height) * 0.40

      ctx.clearRect(0, 0, width, height)

      // 1. Draw Starfield Background
      starsRef.current.forEach((star) => {
        star.alpha += Math.sin(pulseTime * star.speed * 10) * 0.01
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(0.9, star.alpha))})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // 2. Cosmic Atmosphere Radial Glow
      const atmosphereGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.45)
      atmosphereGrad.addColorStop(0, 'rgba(0, 198, 255, 0.28)')
      atmosphereGrad.addColorStop(0.4, 'rgba(0, 114, 255, 0.12)')
      atmosphereGrad.addColorStop(0.8, 'rgba(120, 50, 255, 0.04)')
      atmosphereGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = atmosphereGrad
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.45, 0, Math.PI * 2)
      ctx.fill()

      // 3. Deep 3D Sphere Base & Specular Shading
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.05,
        cx,
        cy,
        radius
      )
      sphereGrad.addColorStop(0, '#10335c')
      sphereGrad.addColorStop(0.35, '#071d38')
      sphereGrad.addColorStop(0.7, '#030d1b')
      sphereGrad.addColorStop(0.95, '#01060e')
      sphereGrad.addColorStop(1, '#000307')

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = sphereGrad
      ctx.fill()

      // Outer Glowing Ring Edge
      ctx.lineWidth = 2.5
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.6)'
      ctx.shadowColor = '#00c6ff'
      ctx.shadowBlur = 15
      ctx.stroke()
      ctx.shadowBlur = 0
      ctx.restore()

      // 3D Projection Helper
      const project3D = (lat: number, lng: number, extraRadius = 0) => {
        const phi = (90 - lat) * (Math.PI / 180)
        const theta = (lng + 180) * (Math.PI / 180)
        const r = radius + extraRadius

        const x = -r * Math.sin(phi) * Math.cos(theta)
        const z = r * Math.sin(phi) * Math.sin(theta)
        const y = r * Math.cos(phi)

        const rotY = rotationRef.current.y
        const tiltX = rotationRef.current.x

        // Rotate Y
        const x1 = x * Math.cos(rotY) + z * Math.sin(rotY)
        const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY)

        // Rotate X (tilt)
        const y1 = y * Math.cos(tiltX) - z1 * Math.sin(tiltX)
        const z2 = y * Math.sin(tiltX) + z1 * Math.cos(tiltX)

        return {
          screenX: cx + x1,
          screenY: cy - y1,
          visible: z2 > 0,
          z: z2,
        }
      }

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()

      // 4. Draw Sci-Fi Latitude/Longitude Grid Lines (Graticules)
      ctx.strokeStyle = 'rgba(0, 198, 255, 0.12)'
      ctx.lineWidth = 1

      for (let lat = -60; lat <= 60; lat += 30) {
        let prevPt: { screenX: number; screenY: number; visible: boolean } | null = null
        ctx.beginPath()
        for (let lng = -180; lng <= 180; lng += 8) {
          const pt = project3D(lat, lng)
          if (pt.visible) {
            if (prevPt && prevPt.visible) ctx.lineTo(pt.screenX, pt.screenY)
            else ctx.moveTo(pt.screenX, pt.screenY)
          }
          prevPt = pt
        }
        ctx.stroke()
      }

      for (let lng = -180; lng < 180; lng += 30) {
        let prevPt: { screenX: number; screenY: number; visible: boolean } | null = null
        ctx.beginPath()
        for (let lat = -90; lat <= 90; lat += 8) {
          const pt = project3D(lat, lng)
          if (pt.visible) {
            if (prevPt && prevPt.visible) ctx.lineTo(pt.screenX, pt.screenY)
            else ctx.moveTo(pt.screenX, pt.screenY)
          }
          prevPt = pt
        }
        ctx.stroke()
      }

      // 5. Draw Landmass Polygons & Vibrant Neon Borders
      CONTINENT_POLYGONS.forEach((poly) => {
        let isAnyVisible = false
        const projectedPoints = poly.map(([lat, lng]) => {
          const pt = project3D(lat, lng)
          if (pt.visible) isAnyVisible = true
          return pt
        })

        if (isAnyVisible) {
          ctx.beginPath()
          projectedPoints.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.screenX, pt.screenY)
            else ctx.lineTo(pt.screenX, pt.screenY)
          })
          ctx.closePath()

          ctx.fillStyle = 'rgba(0, 198, 255, 0.12)'
          ctx.fill()
          ctx.strokeStyle = 'rgba(0, 220, 255, 0.5)'
          ctx.lineWidth = 1.6
          ctx.stroke()
        }
      })

      // 6. Draw High-Density Glowing Continent Dot Grid
      const step = 5
      for (let lat = -60; lat <= 75; lat += step) {
        for (let lng = -180; lng <= 180; lng += step) {
          const isLand = CONTINENT_POLYGONS.some((poly) => {
            let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180
            poly.forEach(([pLat, pLng]) => {
              if (pLat < minLat) minLat = pLat
              if (pLat > maxLat) maxLat = pLat
              if (pLng < minLng) minLng = pLng
              if (pLng > maxLng) maxLng = pLng
            })
            return lat >= minLat - 3 && lat <= maxLat + 3 && lng >= minLng - 3 && lng <= maxLng + 3
          })

          if (isLand) {
            const pt = project3D(lat, lng)
            if (pt.visible) {
              const alpha = Math.max(0.15, (pt.z / radius) * 0.8)
              ctx.fillStyle = `rgba(0, 220, 255, ${alpha})`
              ctx.fillRect(pt.screenX - 1, pt.screenY - 1, 2, 2)
            }
          }
        }
      }

      // 7. Draw 3D Dynamic Connecting Great-Circle Arc (USA -> India)
      const usaPin = LOCATIONS[0]
      const indiaPin = LOCATIONS[1]
      const arcSteps = 40
      const arcPoints: Array<{ screenX: number; screenY: number; visible: boolean; z: number }> = []

      for (let i = 0; i <= arcSteps; i++) {
        const t = i / arcSteps
        // Interpolate lat / lng
        const lat = usaPin.lat + (indiaPin.lat - usaPin.lat) * t
        const lng = usaPin.lng + (indiaPin.lng - usaPin.lng) * t
        // Curve arc outwards in 3D height
        const extraR = Math.sin(t * Math.PI) * 45
        arcPoints.push(project3D(lat, lng, extraR))
      }

      // Draw Arc Line
      ctx.beginPath()
      let arcVisible = false
      arcPoints.forEach((pt, idx) => {
        if (pt.visible) {
          arcVisible = true
          if (idx === 0) ctx.moveTo(pt.screenX, pt.screenY)
          else ctx.lineTo(pt.screenX, pt.screenY)
        }
      })

      if (arcVisible) {
        ctx.strokeStyle = 'rgba(0, 210, 255, 0.45)'
        ctx.lineWidth = 2
        ctx.setLineDash([4, 4])
        ctx.stroke()
        ctx.setLineDash([]) // Reset line dash

        // Traveling Energy Particle along Arc
        const progress = (pulseTime * 0.6) % 1
        const particleIdx = Math.floor(progress * arcSteps)
        const pPt = arcPoints[particleIdx]
        if (pPt && pPt.visible) {
          ctx.beginPath()
          ctx.arc(pPt.screenX, pPt.screenY, 4, 0, Math.PI * 2)
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = '#00c6ff'
          ctx.shadowBlur = 12
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      // 8. Draw Pins (USA & India) with Beacon Rays & Multi-Ring Pulses
      LOCATIONS.forEach((loc) => {
        const pt = project3D(loc.lat, loc.lng)
        if (!pt.visible) return

        const isSelected = activeLocation.id === loc.id
        const isHovered = hoveredLocation?.id === loc.id
        const pinColor = loc.id === 'usa-office' ? '#00aeef' : '#ff4b72'

        ctx.save()

        // Vertical Light Beacon Line
        const beaconPt = project3D(loc.lat, loc.lng, 24)
        if (beaconPt.visible) {
          const beaconGrad = ctx.createLinearGradient(pt.screenX, pt.screenY, beaconPt.screenX, beaconPt.screenY)
          beaconGrad.addColorStop(0, pinColor)
          beaconGrad.addColorStop(1, 'transparent')
          ctx.strokeStyle = beaconGrad
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(pt.screenX, pt.screenY)
          ctx.lineTo(beaconPt.screenX, beaconPt.screenY)
          ctx.stroke()
        }

        // Multi-ring Expanding Pulse Animations
        for (let ring = 1; ring <= 2; ring++) {
          const rSpeed = (pulseTime * 2.5 + ring * 1.2) % 3
          const rRadius = 4 + rSpeed * 8
          const rAlpha = Math.max(0, 0.8 - rSpeed / 3)

          ctx.beginPath()
          ctx.arc(pt.screenX, pt.screenY, rRadius, 0, Math.PI * 2)
          ctx.strokeStyle = loc.id === 'usa-office'
            ? `rgba(0, 198, 255, ${rAlpha})`
            : `rgba(255, 75, 114, ${rAlpha})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        // Outer Selected Ring
        ctx.beginPath()
        ctx.arc(pt.screenX, pt.screenY, isSelected ? 11 : 7, 0, Math.PI * 2)
        ctx.strokeStyle = pinColor
        ctx.lineWidth = isSelected ? 3 : 2
        ctx.stroke()

        // Center Pin Solid Core
        ctx.beginPath()
        ctx.arc(pt.screenX, pt.screenY, isSelected ? 5 : 3.5, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.shadowColor = pinColor
        ctx.shadowBlur = 15
        ctx.fill()
        ctx.shadowBlur = 0

        // Hover / Active Floating City Label Badge
        if (isSelected || isHovered) {
          const badgeText = `${loc.flag} ${loc.city}`
          ctx.font = 'bold 11px system-ui, sans-serif'
          const metrics = ctx.measureText(badgeText)
          const bWidth = metrics.width + 16
          const bHeight = 22
          const bX = pt.screenX - bWidth / 2
          const bY = pt.screenY - 30

          // Badge Background
          ctx.fillStyle = 'rgba(6, 18, 32, 0.95)'
          ctx.strokeStyle = pinColor
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.roundRect(bX, bY, bWidth, bHeight, 8)
          ctx.fill()
          ctx.stroke()

          // Text
          ctx.fillStyle = '#ffffff'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(badgeText, pt.screenX, bY + bHeight / 2)
        }

        ctx.restore()
      })

      ctx.restore() // End clipping

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [activeLocation, hoveredLocation])

  // Mouse drag handlers with FIXED Natural Direction
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    if (isDraggingRef.current) {
      const deltaX = e.clientX - previousMousePositionRef.current.x
      const deltaY = e.clientY - previousMousePositionRef.current.y

      // FIX: Invert deltaY sign so dragging UP pulls globe surface UP naturally!
      rotationRef.current.y += deltaX * 0.005
      rotationRef.current.x = Math.max(-0.9, Math.min(0.9, rotationRef.current.x + deltaY * 0.005))

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY }
    } else {
      // Hover hit detection for USA / India pins
      const width = canvas.width
      const height = canvas.height
      const cx = width / 2
      const cy = height / 2
      const radius = Math.min(width, height) * 0.40

      const phi = (lat: number) => (90 - lat) * (Math.PI / 180)
      const theta = (lng: number) => (lng + 180) * (Math.PI / 180)

      let foundHover: LocationPin | null = null

      LOCATIONS.forEach((loc) => {
        const p = phi(loc.lat)
        const t = theta(loc.lng)
        const x = -radius * Math.sin(p) * Math.cos(t)
        const z = radius * Math.sin(p) * Math.sin(t)
        const y = radius * Math.cos(p)

        const rotY = rotationRef.current.y
        const tiltX = rotationRef.current.x

        const x1 = x * Math.cos(rotY) + z * Math.sin(rotY)
        const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY)
        const y1 = y * Math.cos(tiltX) - z1 * Math.sin(tiltX)
        const z2 = y * Math.sin(tiltX) + z1 * Math.cos(tiltX)

        if (z2 > 0) {
          const screenX = cx + x1
          const screenY = cy - y1
          if (Math.hypot(mouseX - screenX, mouseY - screenY) < 18) {
            foundHover = loc
          }
        }
      })

      setHoveredLocation(foundHover)
    }
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  const handleClick = () => {
    if (hoveredLocation) {
      focusLocation(hoveredLocation)
    }
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      background: 'linear-gradient(145deg, #051426 0%, #020b16 50%, #01060d 100%)',
      borderRadius: '24px',
      border: '1px solid rgba(0, 174, 239, 0.2)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
      padding: '32px 24px',
    }}>

      {/* Top Section Header & Quick Location Selection Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(0, 174, 239, 0.1)', border: '1px solid rgba(0, 174, 239, 0.25)', borderRadius: '20px', marginBottom: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00aeef', boxShadow: '0 0 8px #00aeef' }}></span>
            <span style={{ color: '#00aeef', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Global Network
            </span>
          </div>
          <h3 style={{ color: '#ffffff', fontSize: '26px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
            Our Offices & Development Hubs
          </h3>
        </div>

        {/* Location Selection Tabs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {LOCATIONS.map((loc) => {
            const isSel = activeLocation.id === loc.id
            return (
              <button
                key={loc.id}
                onClick={() => focusLocation(loc)}
                style={{
                  background: isSel
                    ? 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  border: isSel ? '1px solid #00aeef' : '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '10px 18px',
                  borderRadius: '30px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isSel ? '0 6px 20px rgba(0, 174, 239, 0.4)' : 'none',
                }}
              >
                <span style={{ fontSize: '14px' }}>{loc.flag}</span>
                {loc.country} Office
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content Area: 3D Globe + Detailed Address Card */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
      }}>
        {/* 3D Globe Canvas */}
        <div style={{
          position: 'relative',
          flex: '1 1 340px',
          maxWidth: '520px',
          height: '420px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <canvas
            ref={canvasRef}
            width={520}
            height={420}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleClick}
            style={{
              width: '100%',
              height: '100%',
              cursor: hoveredLocation ? 'pointer' : 'grab',
              touchAction: 'none',
            }}
          />
        </div>

        {/* Active Address Card */}
        <div style={{
          flex: '1 1 320px',
          maxWidth: '440px',
          background: 'rgba(8, 24, 44, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 174, 239, 0.3)',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span style={{ fontSize: '18px' }}>{activeLocation.flag}</span>
                <span style={{
                  color: '#00aeef',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  {activeLocation.country} HEADQUARTERS
                </span>
              </div>
              <h4 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, margin: 0 }}>
                {activeLocation.title}
              </h4>
            </div>

            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(0, 174, 239, 0.2) 0%, rgba(0, 114, 255, 0.2) 100%)',
              border: '1px solid rgba(0, 174, 239, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00aeef',
              fontSize: '18px',
              flexShrink: 0,
            }}>
              <i className="fas fa-building"></i>
            </div>
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(0,174,239,0.3) 0%, rgba(255,255,255,0.05) 100%)', margin: '18px 0' }}></div>

          {/* Address */}
          <div style={{ display: 'flex', gap: '14px', marginBottom: '18px', alignItems: 'flex-start' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'rgba(0, 174, 239, 0.12)',
              border: '1px solid rgba(0, 174, 239, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00aeef',
              fontSize: '13px',
              flexShrink: 0,
              marginTop: '2px',
            }}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <p style={{ color: '#8c939e', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
                OFFICE ADDRESS
              </p>
              <p style={{ color: '#ffffff', fontSize: '14px', lineHeight: '1.5', margin: 0, fontWeight: 500 }}>
                {activeLocation.address}
              </p>
            </div>
          </div>

          {/* Phone */}
          {activeLocation.phone && (
            <div style={{ display: 'flex', gap: '14px', marginBottom: '18px', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'rgba(0, 174, 239, 0.12)',
                border: '1px solid rgba(0, 174, 239, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00aeef',
                fontSize: '13px',
                flexShrink: 0,
                marginTop: '2px',
              }}>
                <i className="fas fa-phone-alt"></i>
              </div>
              <div>
                <p style={{ color: '#8c939e', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
                  PHONE NUMBER
                </p>
                <a href={`tel:${activeLocation.phone.replace(/\s+/g, '')}`} style={{ color: '#ffffff', fontSize: '14px', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }}>
                  {activeLocation.phone}
                </a>
              </div>
            </div>
          )}

          {/* Email */}
          {activeLocation.email && (
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'rgba(0, 174, 239, 0.12)',
                border: '1px solid rgba(0, 174, 239, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00aeef',
                fontSize: '13px',
                flexShrink: 0,
                marginTop: '2px',
              }}>
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <p style={{ color: '#8c939e', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
                  EMAIL ADDRESS
                </p>
                <a href={`mailto:${activeLocation.email}`} style={{ color: '#ffffff', fontSize: '14px', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }}>
                  {activeLocation.email}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InteractiveGlobe
