console.log(fetch)




const dataISP = [
  {
    "id": "7d6dd7874cb0426ba3ee190fc06b1aae",
    "alias": "John Doe",
    "name": "ZAP\"|timeout /T 15.0",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "38f4fa3bd9ee4e6698d5f63172c69c32",
    "alias": "John Doe",
    "name": "ZAP'&timeout /T 15.0&'",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "6377d42040f14be79d439a9213897b5e",
    "alias": "John Doe",
    "name": "ZAP'|timeout /T 15.0",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "bbd7db8730af49128b82d7cc380a87ec",
    "alias": "John Doe",
    "name": "ZAP;get-help",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "6d5e9bb8a66b4a0d8c47c95aa28c1423",
    "alias": "John Doe",
    "name": "ZAP\";get-help",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "2a6a95b4d9ad47f8b328a2c3e0c5d428",
    "alias": "John Doe",
    "name": "ZAP';get-help",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "115f4c5c145e4f32bfb83341bfe62b7e",
    "alias": "John Doe",
    "name": "ZAP;get-help #",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "a49ae49de2394f3d856e7da055235e28",
    "alias": "John Doe",
    "name": "ZAP;start-sleep -s 15.0",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "516a11eb853a4e708ad8a7ad331edf5c",
    "alias": "John Doe",
    "name": "ZAP\";start-sleep -s 15.0",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "ac08debfa0f14fec8b648298328f33d0",
    "alias": "John Doe",
    "name": "ZAP';start-sleep -s 15.0",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "97fb36b16fa04320a330a7d32df37662",
    "alias": "John Doe",
    "name": "ZAP;start-sleep -s 15.0 #",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "e74c546901444244888e776f145324da",
    "alias": "John Doe",
    "name": "\"'",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "7a481b2b460945fd927f072e121810d3",
    "alias": "John Doe",
    "name": "<!--",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "dcc92fce70ed43399dc876ceeccfcf0c",
    "alias": "John Doe",
    "name": "]]>",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "f206fb5743234a47ad5a03c398735607",
    "alias": "John Doe",
    "name": "zj 8898*2512 zj",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "5d3ec576e09544f8a28c236fc3cc11e6",
    "alias": "John Doe",
    "name": "zj{8473*2836}zj",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "a6fbe2c169864a038c3f9351351277d6",
    "alias": "John Doe",
    "name": "zj${7937*5396}zj",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "fc77d86720ee4a7680f1ce9f0cafe7b9",
    "alias": "John Doe",
    "name": "zj#{3728*4744}zj",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "18354ac205a44ad19de2ffa867e4932b",
    "alias": "John Doe",
    "name": "zj{#4111*7824}zj",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "698759c58cbf44f799c626b7ce18012b",
    "alias": "John Doe",
    "name": "zj{@4590*9604}zj",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "6e5cb11aaf084163800646cc80d286bc",
    "alias": "John Doe",
    "name": "zj{{3904*5086}}zj",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "91c6eb8c18384726b691ebe511cec23c",
    "alias": "John Doe",
    "name": "zj{{=3227*7066}}zj",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "97cbae6449dc42b0854aec8207bc23f0",
    "alias": "John Doe",
    "name": "zj<%=2789*9199%>zj",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "26176deb7ff4469eb424bb061014546e",
    "alias": "John Doe",
    "name": "zj{{27950|add:26030}}zj",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  },
  {
    "id": "b0b2c5278e9543749e6eacbd377df202",
    "alias": "John Doe",
    "name": "zj{{print \"3992\" \"6962\"}}zj",
    "description": "Zaproxy alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos."
  }
]

const tokenISP = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGV4LndhbmdAYWN0aW9udGVjLmNvbSIsImp0aSI6IjFhYzY0NDI1NTgwOTQwNjhhYmQwNDFhOWZmMTNiM2EyIiwibmFtZSI6IkFsZXggV2FuZyAoTWljcm9zb2Z0KSIsInRlbmFudCI6ImFjdGlvbnRlYyIsInNjb3BlIjpbeyJuYW1lIjoiU1lTVEVNX0FETUlOIiwic2VydmljZSI6Ik9wdGltIiwiZ3JhbnRCeSI6IkRJUkVDVCIsInNvdXJjZSI6bnVsbCwiZW50aXRsZW1lbnRzIjpbeyJyZXNvdXJjZSI6IkFMTCIsInBlcm1pc3Npb25zIjpbIkFMTCJdfV19XSwiZ3JvdXBJZCI6IjBjMDg0ZGRkMzI4YTRhMGQ4MWIwYzM1NzNjMjIxYzRiIiwicm9sZUlkIjoiMTgzYjQwYjU3YTMyNDY0MDhkMDQyMmI1ZjhiMjY2ZTAiLCJ0b2tlbklzc3VlciI6IjBlYzEwNzE0LWM3MmMtMTFlZi1iNjMxLTAyNDJhYzEyMDAwMiIsInZlcmlmeSI6dHJ1ZSwiaW50ZXJuYWxVc2VyIjp0cnVlLCJkYXRhU2VjdXJpdHlNYXBwaW5nIjpbXSwic3Vic2NyaWJlciI6ZmFsc2UsImlzcyI6IjBlYzEwNzE0LWM3MmMtMTFlZi1iNjMxLTAyNDJhYzEyMDAwMiIsImlhdCI6MTc1MDE1ODQxMCwiZXhwIjoxNzUwMTg3MjEwfQ.U1BnJRVH2yZVOci2EzuHigUtZ8jidoBbMmbDyP4Ev_eikIl30cHWLlj1wFXZQplrtuBPELWPqaNGTYJAe8Gxog';

const deleteISP = async (id: string) => {
  try {
    const result = await fetch(`https://alpha.optimportal.com/actiontec/api/v6/iam/isps/${id}`, {
      headers: {
        'X-Authorization': tokenISP
      },
      method: 'DELETE'
    })
    console.log('delete', id, 'success')
  } catch (e) {
    console.log('delete', id, 'failed')
  }

}

for (let item of dataISP) {
  deleteISP(item.id)
}