const images = {
    conferences: [
      "https://a.storyblok.com/f/188325/1920x1280/41e681c422/alexandre-pellaes-6vajp0pscx0-unsplash-1-1.jpg",
      "https://eventtechlive.com/wp-content/uploads/2024/05/47cbde67-1435-4351-b764-7d92bac767ae-1.jpg",
      "https://eventtechlive.com/wp-content/uploads/2024/05/418eb0cb-15f8-4dac-80d1-64622102e21c.jpg",
      "https://www.hire-intelligence.co.uk/wp-content/uploads/2018/02/photo-1504384764586-bb4cdc1707b0.jpg",
      "https://cdn.asp.events/CLIENT_Informa__AADDE28D_5056_B739_5481D63BF875B0DF/sites/london-tech-week-2024/media/exhibit-sponsor-1.svg",
      "https://eventtechlive.com/wp-content/uploads/2023/04/Screenshot-2024-08-16-at-12.33.18.png",
      "https://exhibitionnews.uk/wp-content/uploads/2024/12/excel_.png",
      "https://www.excel.london/uploads/img-2392-1024x768.jpg",
      "https://www.intelligentdatacentres.com/wp-content/uploads/sites/34/2023/02/tech-show-london-image-2.jpeg",
      "https://www.london.gov.uk/sites/default/files/styles/hero_image_sm/public/careers-networking-event-5683-2x1.jpg?h=e2bcc475&itok=XjbLbkPm"
    ],
    hackathons: [
      "https://res.cloudinary.com/devex/image/fetch/c_scale,f_auto,q_auto,w_720/https://lh4.googleusercontent.com/VQyrPPyh-FGdV2BJtlcwDphesnxERD6SLWvGtARygLDVNSsXhFF0kzG_yXvLyiARZbKIG3VYF_CIbF4_B-Wy3Eu7kKhHKKR3pq_2ob2pdZgxt_Wz_uqXjRMrhIBKREQnJo--Ui9b",
      "https://images.squarespace-cdn.com/content/v1/5e6542d2ae16460bb741a9eb/1603318636443-A846ACUKNYUBA0RPLJ94/marvin-meyer-SYTO3xs06fU-unsplash.jpg",
      "https://www.brightidea.com/wp-content/uploads/Who_Participates_in_a_Hackathon.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh__4GPCZA7kJH4oWVoEhDX651vwijsS1-Xg&s",
      "https://cdn.prod.website-files.com/646caab5700fe0d1824a61b9/65170c1e01c86d489de784dd_hackathon.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdloA73AncZuQ8pFiR6PayFrRvjQo6Q5M-0Q&s"
    ],
    webinars: [
      "https://cdn.prod.website-files.com/6305a54ddc68ad7fc38e4f8b/656fbaaa1da0c5abd861e76a_Let%E2%80%99s%20Talk%20Collaboration%20(6).png",
      "https://img.freepik.com/free-vector/gradient-halftone-technology-webinar_23-2149022339.jpg",
      "https://cdn.asp.events/CLIENT_CloserSt_D86EA381_5056_B739_5482D50A1A831DDD/sites/LT-2022/media/Elearningforce-1-archive.png",
      "https://wellingtone.co.uk/wp-content/uploads/2024/10/apm-webinar_Webinar-Move-From-Microsoft-Project-Online-to-Project-for-the-web-Planner.jpg",
      "https://img.youtube.com/vi/gcxxWFU-eiM/maxresdefault.jpg"
    ]
  };

  const imagesFlat = [
    "https://a.storyblok.com/f/188325/1920x1280/41e681c422/alexandre-pellaes-6vajp0pscx0-unsplash-1-1.jpg",
    "https://eventtechlive.com/wp-content/uploads/2024/05/47cbde67-1435-4351-b764-7d92bac767ae-1.jpg",
    "https://eventtechlive.com/wp-content/uploads/2024/05/418eb0cb-15f8-4dac-80d1-64622102e21c.jpg",
    "https://www.hire-intelligence.co.uk/wp-content/uploads/2018/02/photo-1504384764586-bb4cdc1707b0.jpg",
    "https://cdn.asp.events/CLIENT_Informa__AADDE28D_5056_B739_5481D63BF875B0DF/sites/london-tech-week-2024/media/exhibit-sponsor-1.svg",
    "https://eventtechlive.com/wp-content/uploads/2023/04/Screenshot-2024-08-16-at-12.33.18.png",
    "https://exhibitionnews.uk/wp-content/uploads/2024/12/excel_.png",
    "https://www.excel.london/uploads/img-2392-1024x768.jpg",
    "https://www.intelligentdatacentres.com/wp-content/uploads/sites/34/2023/02/tech-show-london-image-2.jpeg",
    "https://www.london.gov.uk/sites/default/files/styles/hero_image_sm/public/careers-networking-event-5683-2x1.jpg?h=e2bcc475&itok=XjbLbkPm",
    "https://res.cloudinary.com/devex/image/fetch/c_scale,f_auto,q_auto,w_720/https://lh4.googleusercontent.com/VQyrPPyh-FGdV2BJtlcwDphesnxERD6SLWvGtARygLDVNSsXhFF0kzG_yXvLyiARZbKIG3VYF_CIbF4_B-Wy3Eu7kKhHKKR3pq_2ob2pdZgxt_Wz_uqXjRMrhIBKREQnJo--Ui9b",
    "https://images.squarespace-cdn.com/content/v1/5e6542d2ae16460bb741a9eb/1603318636443-A846ACUKNYUBA0RPLJ94/marvin-meyer-SYTO3xs06fU-unsplash.jpg",
    "https://www.brightidea.com/wp-content/uploads/Who_Participates_in_a_Hackathon.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh__4GPCZA7kJH4oWVoEhDX651vwijsS1-Xg&s",
    "https://cdn.prod.website-files.com/646caab5700fe0d1824a61b9/65170c1e01c86d489de784dd_hackathon.png",
    "https://news.cs.washington.edu/wp-content/uploads/2023/04/impact-hackathon-social-1.jpg",
    "https://cdn.prod.website-files.com/6305a54ddc68ad7fc38e4f8b/656fbaaa1da0c5abd861e76a_Let%E2%80%99s%20Talk%20Collaboration%20(6).png",
    "https://img.freepik.com/free-vector/gradient-halftone-technology-webinar_23-2149022339.jpg",
    "https://cdn.asp.events/CLIENT_CloserSt_D86EA381_5056_B739_5482D50A1A831DDD/sites/LT-2022/media/Elearningforce-1-archive.png",
    "https://wellingtone.co.uk/wp-content/uploads/2024/10/apm-webinar_Webinar-Move-From-Microsoft-Project-Online-to-Project-for-the-web-Planner.jpg",
    "https://img.youtube.com/vi/gcxxWFU-eiM/maxresdefault.jpg"
  ];


  export default {
    images,
    imagesFlat
  };
