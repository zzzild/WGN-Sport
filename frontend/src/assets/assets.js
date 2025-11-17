import logo from './logo.png'
import logoNoBg from './logo-nobg.png'
import header_img from './header_img.jpg'
import background_img from './bg-web.jpg'
import musolah_img from './musolah.jpeg'
import toilet_img from './toilerr.jpeg'
import parkir_img from './parkir.jpeg'
import kantin_img from './kantin.jpeg'
import place_img from './banner-background.jpg'
import lapangan1_img from './lapangan1.jpeg'
import lapangan2_img from './lapangan2.jpeg'
import lapangan3_img from './lapangan3.jpeg'
import lapangan4_img from './lapangan4.jpeg'
import lapangan5_img from './lapangan5.jpeg'
import lapangan6_img from './lapangan6.jpeg'
import lapangan7_img from './lapangan7.jpeg'
import profile_pic from './profile_pic.png'
import dropdown_icon from './dropdown_icon.svg'
import cross_icon from './cross_icon.png'
import menu_icon from './menu_icon.svg'


export const assets = {
    logo, header_img, background_img,
    musolah_img, toilet_img, parkir_img,
    kantin_img, place_img, logoNoBg, lapangan1_img,
    lapangan2_img, lapangan3_img, lapangan4_img, lapangan5_img,
    lapangan6_img, lapangan7_img, profile_pic, dropdown_icon,
    cross_icon, menu_icon
}

export const fasilitasData = [
  {
    img: assets.musolah_img,
    title: "Mushola",
    desc: "Disediakan mushola yang bersih dan nyaman agar pengunjung tetap dapat beribadah dengan tenang.",
    date: "21 Jan 2025"
  },
  {
    img: assets.parkir_img,
    title: "Parkiran",
    desc: "Area parkir luas dan aman untuk kendaraan motor maupun mobil pengunjung.",
    date: "21 Jan 2025"
  },
  {
    img: assets.toilet_img,
    title: "Toilet",
    desc: "Toilet bersih dan terawat agar pengunjung merasa nyaman selama berada di area lapangan.",
    date: "21 Jan 2025"
  },
  {
    img: assets.kantin_img,
    title: "Kantin",
    desc: "Tersedia kantin dengan berbagai pilihan makanan dan minuman untuk menemani waktu istirahat.",
    date: "21 Jan 2025"
  },
]

export const lapangan = [
    {
      id: 1,
      image: assets.lapangan1_img,
      price: "Rp 30.000 / Jam",
      name: "Lapangan 1",
    },
    {
      id: 2,
      image: lapangan2_img,
      price: "Rp 30.000 / Jam",
      name: "Lapangan 2",
    },
    {
      id: 3,
      image: lapangan3_img,
      price: "Rp 30.000 / Jam",
      name: "Lapangan 3",
    },
    {
      id: 4,
      image: lapangan4_img,
      price: "Rp 30.000 / Jam",
      name: "Lapangan 4",
    },
    {
      id: 5,
      image: lapangan5_img,
      price: "Rp 30.000 / Jam",
      name: "Lapangan 5",
    },
    {
      id: 6,
      image: lapangan6_img,
      price: "Rp 30.000 / Jam",
      name: "Lapangan 6",
    },
    {
      id: 7,
      image: lapangan7_img,
      price: "Rp 30.000 / Jam",
      name: "Lapangan 7",
    },
  ];
