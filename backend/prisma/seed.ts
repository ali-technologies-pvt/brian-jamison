import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Seed Super Admin User
  const saltRounds = 12;
  const rawPassword = 'Imthepassword@123';
  const passwordHash = await bcrypt.hash(rawPassword, saltRounds);

  const superAdmin = await prisma.user.upsert({
    where: { username: 'brianjamison' },
    update: {
      passwordHash,
      role: Role.SUPER_ADMIN,
      name: 'Brian Jamison',
      email: 'BJamison@Salt.RealEstate',
    },
    create: {
      username: 'brianjamison',
      email: 'BJamison@Salt.RealEstate',
      name: 'Brian Jamison',
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });

  console.log(`✅ Seeded Super Admin user: ${superAdmin.username} (${superAdmin.role})`);

  // 2. Seed Global Business Settings
  const globalSettings = await prisma.globalSettings.upsert({
    where: { id: 'global' },
    update: {
      agentName: 'Brian Jamison',
      phone: '(405) 513-3039',
      email: 'BJamison@Salt.RealEstate',
      licenseNumber: '184931',
      brokerageName: 'Salt Real Estate Corporate Office',
      brokerAddress: '1508 W. Edmond Rd., Edmond, Oklahoma 73003',
      statVolumeSold: '$62M+',
      statClosings: '370+',
      statRank: 'Top 2% OKC Producer',
    },
    create: {
      id: 'global',
      agentName: 'Brian Jamison',
      phone: '(405) 513-3039',
      email: 'BJamison@Salt.RealEstate',
      licenseNumber: '184931',
      brokerageName: 'Salt Real Estate Corporate Office',
      brokerAddress: '1508 W. Edmond Rd., Edmond, Oklahoma 73003',
      statVolumeSold: '$62M+',
      statClosings: '370+',
      statRank: 'Top 2% OKC Producer',
    },
  });

  console.log(`✅ Seeded Global Settings for: ${globalSettings.agentName} @ ${globalSettings.brokerageName}`);

  // 3. Seed Sample Property Listing: The Grandview Estate
  const grandviewListing = await prisma.propertyListing.upsert({
    where: { slug: 'the-grandview-estate-nichols-hills' },
    update: {
      title: 'The Grandview Estate',
      neighborhood: 'Nichols Hills',
      city: 'Oklahoma City',
      price: 2450000,
      bedrooms: 5,
      bathrooms: 6.5,
      sqft: 7240,
      daysToEscrow: 8,
      status: 'Sold',
      featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      featuredAlt: 'The Grandview Estate exterior Nichols Hills luxury home',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ],
      matterportUrl: 'https://my.matterport.com/show/?m=sample-grandview',
      reelUrl: 'https://instagram.com/reel/sample-grandview',
      videoWalkthrough: 'https://youtube.com/watch?v=sample-grandview',
      metaTitle: 'The Grandview Estate · Nichols Hills Luxury Real Estate | Brian Jamison',
      metaDescription: 'Explore The Grandview Estate in Nichols Hills, Oklahoma City. Sold in 8 days for $2,450,000 by Brian Jamison using the 6-Phase Seller Blueprint.',
      canonicalUrl: '/listings/the-grandview-estate-nichols-hills',
      noIndex: false,
      noFollow: false,
    },
    create: {
      title: 'The Grandview Estate',
      slug: 'the-grandview-estate-nichols-hills',
      neighborhood: 'Nichols Hills',
      city: 'Oklahoma City',
      price: 2450000,
      bedrooms: 5,
      bathrooms: 6.5,
      sqft: 7240,
      daysToEscrow: 8,
      status: 'Sold',
      featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      featuredAlt: 'The Grandview Estate exterior Nichols Hills luxury home',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ],
      matterportUrl: 'https://my.matterport.com/show/?m=sample-grandview',
      reelUrl: 'https://instagram.com/reel/sample-grandview',
      videoWalkthrough: 'https://youtube.com/watch?v=sample-grandview',
      metaTitle: 'The Grandview Estate · Nichols Hills Luxury Real Estate | Brian Jamison',
      metaDescription: 'Explore The Grandview Estate in Nichols Hills, Oklahoma City. Sold in 8 days for $2,450,000 by Brian Jamison using the 6-Phase Seller Blueprint.',
      canonicalUrl: '/listings/the-grandview-estate-nichols-hills',
      noIndex: false,
      noFollow: false,
    },
  });

  console.log(`✅ Seeded Sample Property Listing: ${grandviewListing.title} (${grandviewListing.slug})`);

  // 4. Seed Sample Service Area: Nichols Hills
  const nicholsHillsArea = await prisma.serviceArea.upsert({
    where: { slug: 'nichols-hills' },
    update: {
      name: 'Nichols Hills',
      category: 'Historic Luxury & Enclaves',
      subheading: 'Oklahoma City’s Premier Residential Enclave & Private Parkways',
      medianPrice: 1150000,
      avgDaysOnMarket: 14,
      description: 'Nichols Hills is widely recognized as the pinnacle of luxury residential living in the Oklahoma City metropolitan region. Featuring tree-lined parkways, manicured estates, and timeless historic architecture.',
      featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Luxury Nichols Hills estate home and lush landscaping',
      metaTitle: 'Nichols Hills Luxury Real Estate & Market Reports | Brian Jamison',
      metaDescription: 'Explore Nichols Hills real estate, luxury estates, and current neighborhood market metrics with top 2% OKC producer Brian Jamison.',
      canonicalUrl: '/areas/nichols-hills',
      noIndex: false,
    },
    create: {
      name: 'Nichols Hills',
      slug: 'nichols-hills',
      category: 'Historic Luxury & Enclaves',
      subheading: 'Oklahoma City’s Premier Residential Enclave & Private Parkways',
      medianPrice: 1150000,
      avgDaysOnMarket: 14,
      description: 'Nichols Hills is widely recognized as the pinnacle of luxury residential living in the Oklahoma City metropolitan region. Featuring tree-lined parkways, manicured estates, and timeless historic architecture.',
      featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Luxury Nichols Hills estate home and lush landscaping',
      metaTitle: 'Nichols Hills Luxury Real Estate & Market Reports | Brian Jamison',
      metaDescription: 'Explore Nichols Hills real estate, luxury estates, and current neighborhood market metrics with top 2% OKC producer Brian Jamison.',
      canonicalUrl: '/areas/nichols-hills',
      noIndex: false,
    },
  });

  console.log(`✅ Seeded Sample Service Area: ${nicholsHillsArea.name} (${nicholsHillsArea.slug})`);

  // 5. Seed Core Blueprint Steps
  const blueprintSteps = [
    {
      stepNumber: 1,
      stepBadge: 'Phase 01',
      categoryBadge: 'Marketing Engine',
      title: 'Elite Marketing Plan & Maximum Exposure Engine',
      whatWeDo: 'Comprehensive 4K architectural HDR photography, drone flyovers, 3D Matterport virtual tours, and syndication to 350+ global portals.',
      sellerBenefit: 'Maximizes prospective buyer reach and establishes immediate high-demand perceived value before the first open house.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Phase 1 high-impact architectural media suite',
    },
    {
      stepNumber: 2,
      stepBadge: 'Phase 02',
      categoryBadge: 'Communication',
      title: 'Proactive & Transparent Communication',
      whatWeDo: 'Mandatory showing feedback within 2 hours, weekly traffic dashboards, and direct negotiation debriefs.',
      sellerBenefit: 'Total visibility without guesswork. You are never left wondering what buyers and agents are saying.',
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Phase 2 transparent communication and agent debriefs',
    },
    {
      stepNumber: 6,
      stepBadge: 'Phase 06',
      categoryBadge: 'Guarantee',
      title: 'Zero-Risk Partnership & Cancel-Anytime Pledge',
      whatWeDo: 'A 100% unconditional performance guarantee. If Brian does not meet his fiduciary and marketing commitments, cancel with zero penalty.',
      sellerBenefit: 'Zero risk, zero lock-in anxiety. Complete alignment with your bottom-line net proceeds.',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Phase 6 cancel anytime risk-free guarantee',
    },
  ];

  for (const step of blueprintSteps) {
    await prisma.blueprintStep.upsert({
      where: { stepNumber: step.stepNumber },
      update: step,
      create: step,
    });
  }

  console.log(`✅ Seeded ${blueprintSteps.length} Blueprint Steps`);
  console.log('🎉 Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
