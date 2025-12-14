type category =
  | "food"
  | "transport"
  | "subscription"
  | "rent"
  | "travels"
  | "shopping"
  | "entertainment"
  | "events";

type paymentStatus = "settled" | "pending";

//in a real scenario, members should contain only their ids but since i'm just simulating it, i'll break down the data
type members = {
  image: string;
};

export interface IBill {
  amount: number;
  name: string;
  description: string;
  dueDate: string;
  category: category;
  paymentStatus: paymentStatus;
  members: members[];
}
