import { IBill } from "../types/bills/bill.type";

const data: IBill[] = [
  {
    amount: 20000,
    name: "Bolt ride",
    description: "Ride from NYSC Camp to NCAIR",
    dueDate: "2025-12-13T14:02:29.312Z" ,
    category: "transport",
    paymentStatus: "pending",
    members: [
      {
        image: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      {
        image: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      {
        image: "https://randomuser.me/api/portraits/women/3.jpg",
      },
      {
        image: "https://randomuser.me/api/portraits/men/4.jpg",
      },
    ],
  },
  {
    amount: 50000,
    name: "Chicken Republic",
    description: "Bought food and drinks",
    dueDate: "2025-12-13T14:02:29.312Z" ,
    category: "food",
    paymentStatus: "settled",
    members: [
      {
        image: "https://randomuser.me/api/portraits/women/5.jpg",
      },
      {
        image: "https://randomuser.me/api/portraits/men/6.jpg",
      },
      {
        image: "https://randomuser.me/api/portraits/women/7.jpg",
      },
      {
        image: "https://randomuser.me/api/portraits/men/8.jpg",
      },
      {
        image: "https://randomuser.me/api/portraits/women/9.jpg",
      },
    ],
  },
];

export default data;
