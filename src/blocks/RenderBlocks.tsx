import React, { Fragment } from 'react'

import type { Page, Project, Service, Team } from '@/payload-types'
import { BlockErrorBoundary } from '@/components/BlockErrorBoundary'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroOneBlock } from '@/blocks/HeroOne/Component'
import { HeroTwoBlock } from '@/blocks/HeroTwo/Component'
import { HeroThreeBlock } from '@/blocks/HeroThree/Component'
import { HeroFourBlock } from '@/blocks/HeroFour/Component'
import { HeroFiveBlock } from '@/blocks/HeroFive/Component'
import { AboutUsBlock } from '@/blocks/AboutUs/Component'
import { AboutUsTwoBlock } from '@/blocks/AboutUsTwo/Component'
import { AboutUsThreeBlock } from '@/blocks/AboutUsThree/Component'
import { AboutUsFourBlock } from '@/blocks/AboutUsFour/Component'
import { CountersBlock } from '@/blocks/Counters/Component'
import { CountersTwoBlock } from '@/blocks/CountersTwo/Component'
import { ServicesBlock } from '@/blocks/ServicesBlock/Component'
import { ServicesTwoBlock } from '@/blocks/ServicesTwo/Component'
import { ServicesThreeBlock } from '@/blocks/ServicesThree/Component'
import { ServicesFourBlock } from '@/blocks/ServicesFour/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { TeamBlock } from '@/blocks/TeamBlock/Component'
import { CallToAction2Block } from '@/blocks/CallToAction2/Component'
import { SubscribeBlock } from '@/blocks/SubscribeBlock/Component'
import { PortfolioBlock } from '@/blocks/PortfolioBlock/Component'
import { PortfolioTwoBlock } from '@/blocks/PortfolioTwo/Component'
import { PricesBlock } from '@/blocks/PricesBlock/Component'
import { PricesTwo } from '@/blocks/PricesTwo/Component'
import { IntroBlock } from '@/blocks/Intro/Component'
import { PortfolioGrid } from '@/blocks/PortfolioGrid/Component'
import { AboutProjectBlock } from '@/blocks/AboutProject/Component'
import { AboutServiceBlock } from '@/blocks/AboutService/Component'
import { AboutTeamBlock } from '@/blocks/AboutTeam/Component'
import { FeaturesBlock } from '@/blocks/Features/Component'
import { FeaturesTwoBlock } from '@/blocks/FeaturesTwo/Component'
import { FaqBlock } from '@/blocks/FaqBlock/Component'
import { ReusableBlock } from './ReusableContent/Component'
import { TestimonialsBlock } from './TestimonialsBlock/Component'
import { StepsBlock } from '@/blocks/StepsBlock/Component'
import { ContactFormBlock } from '@/blocks/ContactFormBlock/Component'
import { ClientsBlock } from '@/blocks/ClientsBlock/Component'
import { CareerBlock } from '@/blocks/CareerBlock/Component'
import { SupportGridBlock } from '@/blocks/SupportGridBlock/Component'
import { CommitmentBlock } from '@/blocks/CommitmentBlock/Component'
import { StaffingServicesBlock } from '@/blocks/StaffingServicesBlock/Component'
import { ITServicesBlock } from '@/blocks/ITServicesBlock/Component'
import { IndustriesBlock } from '@/blocks/IndustriesBlock/Component'
import { WhyPartnerBlock } from '@/blocks/WhyPartnerBlock/Component'
import { AboutUsPremiumBlock } from '@/blocks/AboutUsPremiumBlock/Component'
import { CoreServicesBlock } from '@/blocks/CoreServicesBlock/Component'
import { PremiumOverviewBlock } from '@/blocks/PremiumOverviewBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  hero_one: HeroOneBlock,
  hero_two: HeroTwoBlock,
  hero_three: HeroThreeBlock,
  hero_four: HeroFourBlock,
  hero_five: HeroFiveBlock,
  about_us: AboutUsBlock,
  about_us_two: AboutUsTwoBlock,
  about_us_three: AboutUsThreeBlock,
  about_us_four: AboutUsFourBlock,
  counters: CountersBlock,
  counters_two: CountersTwoBlock,
  services: ServicesBlock,
  services_two: ServicesTwoBlock,
  services_three: ServicesThreeBlock,
  services_four: ServicesFourBlock,
  call_to_action: CallToActionBlock,
  team_block: TeamBlock,
  call_to_action_2: CallToAction2Block,
  subscribe: SubscribeBlock,
  portfolio: PortfolioBlock,
  portfolio_two: PortfolioTwoBlock,
  prices_block: PricesBlock,
  prices_two: PricesTwo,
  intro: IntroBlock,
  portfolio_grid: PortfolioGrid,
  about_project: AboutProjectBlock,
  about_service: AboutServiceBlock,
  about_team: AboutTeamBlock,
  features: FeaturesBlock,
  features_two: FeaturesTwoBlock,
  faq: FaqBlock,
  reusable_block: ReusableBlock,
  testimonials: TestimonialsBlock,
  steps_block: StepsBlock,
  contact_form_block: ContactFormBlock,
  clients_block: ClientsBlock,
  career_block: CareerBlock,
  support_grid_block: SupportGridBlock,
  commitment_block: CommitmentBlock,
  staffing_services_block: StaffingServicesBlock,
  it_services_block: ITServicesBlock,
  industries_block: IndustriesBlock,
  why_partner_block: WhyPartnerBlock,
  about_us_premium_block: AboutUsPremiumBlock,
  core_services_block: CoreServicesBlock,
  premium_overview_block: PremiumOverviewBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][] | Project['layout'][0][] | Service['layout'][0][] | Team['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <Fragment key={index}>
                  <BlockErrorBoundary>
                    <Block {...block} disableInnerContainer />
                  </BlockErrorBoundary>
                </Fragment>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
