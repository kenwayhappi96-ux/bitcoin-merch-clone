import { Bitcoin, BookOpen, Dice1, Facebook, Instagram, LifeBuoy, Microchip, Star, Twitter, Users, Youtube } from "lucide-react";

export const links=[
    {
        icon:Twitter,
        name:'Twitter',
        link:'https://twitter.com'
    },
    {
        icon:Facebook,
        name:'Facebook',
        link:"https://facebook.com"
    },
    {
        icon:Instagram,
        name:'Instagram',
        link:"https://instagram.com"
    },
    {
        icon:Youtube,
        name:'Youtube',
        link:"https://youtube.com"
    },
]

export const quick_links = [
    {
        name:'Guides',
        link:'/guides'
    },
    {
        name:'Press',
        link:'/press'
    },
    {
        name:'Search',
        link:'/search'
    },
    {
        name:'Join Affiliate Program',
        link:'/affiliate'
    },
    {
        name:'About Us',
        link:'/about'
    },
    {
        name:'Contact Us',
        link:'/contact'
    },
    {
        name:'Rewards',
        link:'/rewards'
    },
]

export const infos = [
    {
        name:'Privacy Policy',
        link:'/privacy'
    },
    {
        name:'Refund Policy',
        link:'/refund'
    },
    {
        name:'Terms of Service',
        link:'/terms'
    },
    {
        name:'Refurbished Mining Equipment',
        link:'/refurbished'
    },
    {
        name:'Partners',
        link:'/partners'
    },
    {
        name:'Bitcoin Merch Team',
        link:'/team'
    },
    {
        name:'Start Selling Lottery Miners',
        link:'/white-label'
    },
]

export const nav_link =[
    {
        name:'Lucky Miners',
        link:"/collections/lucky-miners",
        icon:Dice1
    },
    {
        name:'Bitaxe Miners',
        link:"/collections/bitaxe-miners",
        icon:Microchip
    },
    {
        name:'Battle Pass',
        link:"/battle-pass",
        icon:Bitcoin
    },
    {
        name:'Video Guides',
        link:"/video-guides",
        icon:BookOpen
    },
    {
        name:'Reviews',
        link:"/reviews",
        icon:Star
    },
    {
        name:'Pool',
        link:"/pool",
        icon:Users
    },
    {
        name:'Support',
        link:"/support",
        icon:LifeBuoy
    },
]

export const contact_method = [
    {
        name:'Call Us',
        icon:'📞',
        val:'(877) 5000-BTC',
        info:'Fastest support',
        btn:'Call now',
        link: 'tel:8775000282'
    },
    {
        name:'Email Support',
        icon:'✉️',
        val:'support@bitcoinmerch.com',
        info:'Response within 24 hours',
        btn:'Send Email',
        link: 'mailto:support@bitcoinmerch.com'
    },
    {
        name:'Chat & Telegram',
        icon:'💬',
        val:'Live chat or join our community',
        info:``,
        btn:'Join Telegram',
        link: 'https://t.me/bitcoinmerch'
    },
]

export const slides = [
  {
    id: 1,
    image: '/ref/c1.JPG',
    title: 'Join the Battle Pass',
    subtitle: 'Exclusive rewards and mining benefits',
    link: '/battle-pass',
    buttonText: 'Shop Now'
  },
  {
    id: 2,
    image: '/ref/c2.JPG',
    title: 'Must Go Warehouse Miners',
    subtitle: 'Limited stock clearance on premium equipment',
    link: '/collections/lucky-miners',
    buttonText: 'Shop Now'
  },
  {
    id: 3,
    image: '/ref/c3.JPG',
    title: 'Free Shipping on Orders $400+',
    subtitle: 'Fast delivery on all mining equipment',
    link: '/collections/bitaxe-miners',
    buttonText: 'Shop Now'
  },
  {
    id: 4,
    image: '/ref/c4.JPG',
    title: 'Visit Our Store',
    subtitle: 'California warehouse - Open for pickup',
    link: '/support',
    buttonText: 'Learn More'
  },
  {
    id: 5,
    image: '/ref/c5.JPG',
    title: 'Pay with Crypto',
    subtitle: 'Bitcoin, Ethereum, and more accepted',
    link: '/',
    buttonText: 'Shop Now'
  }
]

export const reviews = [
  {
    title: "Chris helped me get my Mars Lander v2...",
    text: "Chris helped me get my Mars Lander v2 back in action. Great support! Thanks guys",
    author: "Andreas",
    date: "2 days ago",
    isVerified: false,
  },
  {
    title: "Fast shipping",
    text: "Fast shipping, good product, local USA. Also joined Legend Battle Pass.",
    author: "Myles Nolte",
    date: "January 7",
    isVerified: true,
  },
  {
    title: "All good Albert got me taken care of!",
    text: "My first order went well. Second one had was a bit slow on hearing any...",
    author: "Not to impressed",
    date: "January 7",
    isVerified: true,
  },
  {
    title: "All good Albert got me taken care of!",
    text: "My first order went well. Second one had was a bit slow on hearing any...",
    author: "Not to impressed",
    date: "January 7",
    isVerified: true,
  },
  {
    title: "All good Albert got me taken care of!",
    text: "My first order went well. Second one had was a bit slow on hearing any...",
    author: "Not to impressed",
    date: "January 7",
    isVerified: true,
  },
  {
    title: "Great experience",
    text: "Order came in about 10 days and everything was perfect.",
    author: "John",
    date: "December 27",
    isVerified: false,
  },
];

export const videoGuides = [
  {
    id: 1,
    title: 'Setting Up Your Lucky Miner - Complete Guide',
    description: 'Learn how to unbox, connect, and configure your Lucky Miner for solo Bitcoin mining.',
    duration: '12:45',
    thumbnail: 'https://via.placeholder.com/640x360/3b82f6/ffffff?text=Lucky+Miner+Setup',
    category: 'Getting Started',
    link: '/video-guides/video-1'
  },
  {
    id: 2,
    title: 'Bitaxe Configuration Tutorial',
    description: 'Step-by-step guide to setting up WiFi, connecting to pools, and monitoring your Bitaxe miner.',
    duration: '18:30',
    thumbnail: 'https://via.placeholder.com/640x360/ef4444/ffffff?text=Bitaxe+Config',
    category: 'Setup',
    link: '/video-guides/video-2'
  },
  {
    id: 3,
    title: 'Understanding Bitcoin Mining Pools',
    description: 'Learn the difference between pool mining and solo mining, and which is right for you.',
    duration: '9:15',
    thumbnail: 'https://via.placeholder.com/640x360/10b981/ffffff?text=Mining+Pools',
    category: 'Education',
    link: '/video-guides/video-3'
  },
  {
    id: 4,
    title: 'Optimizing Your Mining Setup for Maximum Efficiency',
    description: 'Tips and tricks to reduce power consumption and increase hashrate performance.',
    duration: '15:20',
    thumbnail: 'https://via.placeholder.com/640x360/FF8C00/ffffff?text=Optimization',
    category: 'Advanced',
    link: '/video-guides/video-4'
  },
  {
    id: 5,
    title: 'Cooling Solutions for Home Mining',
    description: 'Best practices for keeping your miners cool and running efficiently.',
    duration: '10:55',
    thumbnail: 'https://via.placeholder.com/640x360/06b6d4/ffffff?text=Cooling',
    category: 'Maintenance',
    link: '/video-guides/video-5'
  },
  {
    id: 6,
    title: 'Troubleshooting Common Mining Issues',
    description: 'How to diagnose and fix the most common problems miners face.',
    duration: '14:40',
    thumbnail: 'https://via.placeholder.com/640x360/8b5cf6/ffffff?text=Troubleshooting',
    category: 'Support',
    link:'/video-guides/video-6'
  }
]
