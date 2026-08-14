import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'
import { Team } from './collections/Team'
import { Users } from './collections/Users'
import { Clients } from './collections/Clients'

import { Footer } from './globals/Footer/config'
import { Header } from './globals/Header/config'
import { Blog } from './globals/Blog/config'
import { ServicesPage } from './globals/Services/config'
import { ProjectsPage } from './globals/Projects/config'
import { TeamPage } from './globals/Team/config'
import { General } from './globals/General/config'
import { ReusableContent } from './collections/ReusableContent'

import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

import { Archive } from './blocks/ArchiveBlock/config'
import { Content } from './blocks/Content/config'
import { FormBlock } from './blocks/Form/config'
import { MediaBlock } from './blocks/MediaBlock/config'
import { HeroOne } from './blocks/HeroOne/config'
import { HeroTwo } from './blocks/HeroTwo/config'
import { HeroThree } from './blocks/HeroThree/config'
import { HeroFour } from './blocks/HeroFour/config'
import { HeroFive } from './blocks/HeroFive/config'
import { AboutUs } from './blocks/AboutUs/config'
import { AboutUsTwo } from './blocks/AboutUsTwo/config'
import { AboutUsThree } from './blocks/AboutUsThree/config'
import { AboutUsFour } from './blocks/AboutUsFour/config'
import { Counters } from './blocks/Counters/config'
import { CountersTwo } from './blocks/CountersTwo/config'
import { ServicesBlock } from './blocks/ServicesBlock/config'
import { ServicesTwo } from './blocks/ServicesTwo/config'
import { ServicesThree } from './blocks/ServicesThree/config'
import { ServicesFour } from './blocks/ServicesFour/config'
import { CallToAction } from './blocks/CallToAction/config'
import { TeamBlock } from './blocks/TeamBlock/config'
import { CallToAction2 } from './blocks/CallToAction2/config'
import { Subscribe } from './blocks/SubscribeBlock/config'
import { Portfolio } from './blocks/PortfolioBlock/config'
import { PortfolioTwo } from './blocks/PortfolioTwo/config'
import { PricesBlock } from './blocks/PricesBlock/config'
import { PricesTwo } from './blocks/PricesTwo/config'
import { IntroBlock } from './blocks/Intro/config'
import { PortfolioGrid } from './blocks/PortfolioGrid/config'
import { AboutProject } from './blocks/AboutProject/config'
import { AboutService } from './blocks/AboutService/config'
import { Features } from './blocks/Features/config'
import { FeaturesTwo } from './blocks/FeaturesTwo/config'
import { Faq } from './blocks/FaqBlock/config'
import { ReusableBlock } from './blocks/ReusableContent/config'
import { AboutTeam } from './blocks/AboutTeam/config'
import { TestimonialsBlock } from './blocks/TestimonialsBlock/config'
import { StepsBlock } from './blocks/StepsBlock/config'
import { ContactFormBlock } from './blocks/ContactFormBlock/config'
import { ClientsBlock } from './blocks/ClientsBlock/config'
import { CareerBlock } from './blocks/CareerBlock/config'
import { SupportGridBlock } from './blocks/SupportGridBlock/config'
import { CommitmentBlock } from './blocks/CommitmentBlock/config'
import { StaffingServicesBlock } from './blocks/StaffingServicesBlock/config'
import { ITServicesBlock } from './blocks/ITServicesBlock/config'
import { IndustriesBlock } from './blocks/IndustriesBlock/config'
import { WhyPartnerBlock } from './blocks/WhyPartnerBlock/config'
import { AboutUsPremiumBlock } from './blocks/AboutUsPremiumBlock/config'
import { CoreServicesBlock } from './blocks/CoreServicesBlock/config'
import { PremiumOverviewBlock } from './blocks/PremiumOverviewBlock/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({ 
    url: process.env.DATABASE_URI 
  }),
  blocks: [
    Content, 
    MediaBlock, 
    Archive, 
    FormBlock, 
    HeroOne, 
    HeroTwo,
    HeroThree,
    HeroFour, 
    HeroFive, 
    AboutUs,
    AboutUsTwo, 
    AboutUsThree,
    AboutUsFour,
    Counters,
    CountersTwo,
    ServicesBlock, 
    ServicesTwo,
    ServicesThree,
    ServicesFour,
    CallToAction, 
    TeamBlock,  
    CallToAction2, 
    Subscribe, 
    Portfolio,
    PortfolioTwo,
    PricesBlock, 
    PricesTwo,
    IntroBlock,
    PortfolioGrid,
    AboutProject,
    AboutService,
    Features,
    FeaturesTwo,
    Faq,
    ReusableBlock,
    AboutTeam,
    TestimonialsBlock,
    StepsBlock,
    ContactFormBlock,
    ClientsBlock,
    CareerBlock,
    SupportGridBlock,
    CommitmentBlock,
    StaffingServicesBlock,
    ITServicesBlock,
    IndustriesBlock,
    WhyPartnerBlock,
    AboutUsPremiumBlock,
    CoreServicesBlock,
    PremiumOverviewBlock,
  ],
  collections: [Pages, Posts, Projects, Services, Team, Media, Categories, Users, ReusableContent, Clients],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Blog, ServicesPage, ProjectsPage, TeamPage, General],
  plugins: [
    ...plugins,
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  email: nodemailerAdapter({
    defaultFromAddress: 'your-email@email.com',
    defaultFromName: 'Lumex PayloadCMS',
    transportOptions: nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY || '',
    }),
  }),
})
