'use client'
import BackgroundContainer from '@/components/BackgroundContainer'
import TextBlock from '@/components/TextBlock'
import TeamCard from '@/components/TeamCard'
import { use } from 'react'
import Review from '@/components/Review'

export default function Home() {
  return (
    <main >
    <BackgroundContainer>
      <TextBlock 
      header='Destributor  Verification'
      subHeader='We Use ZKPass to verify if you are a destributor on ebefa.com'
      />
     {/* <FeaturedCards/> */}

          <TextBlock 
      header='Our Team'
      subHeader='The Best Engineers in the world'
      />
     <TeamCard/>
     <TextBlock 
header='Customers'
subHeader='What our Customers are saying'
/>
<Review />
    </BackgroundContainer>
    </main>
  )
}
