export interface Card {
  _id?: string;
  name: string;
  surName: string;
  telephone: string;
  email: string;
  image?: { data: { data: Array<number>; type: string }; contentType: string };
  imageName?: string;
}

export const blankCard: Card = {
  name: "",
  surName: "",
  telephone: "",
  email: "",
};

export const getImageUrl = (card: Card): string => {
  if (card.image) {
    try {
      const buffer = Buffer.from(card.image.data.data);
      const arrayBuffer = Uint8Array.from(buffer);
      const blob = new Blob([arrayBuffer], { type: card.image.contentType });
      const urlCreator = window.URL || window.webkitURL;
      return urlCreator.createObjectURL(blob);
    } catch (err) {
      console.log(err);
    }
  }
  return "";
};

const getEditable = (card: Partial<Card>): Partial<Card> => {
  return (({ name, surName, telephone, email, image }) => ({
    name,
    surName,
    telephone,
    email,
    image,
  }))({ ...blankCard, ...card });
};

const url = "http://localhost:4000/api/cards/";

export const fetchAll = async (): Promise<Card[]> => {
  try {
    return await fetch(url).then((data) => data.json());
  } catch (error) {
    throw Error("Could not connect to server.");
  }
};

export const fetchById = async (id: string): Promise<Card> => {
  try {
    return await fetch(`${url}${id}`).then((response) => {
      if (!response.ok) throw new Error("Card does not exist.");
      return response.json();
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteById = async (id: string): Promise<{ message: string }> => {
  try {
    return await fetch(`${url}${id}`, { method: "DELETE" }).then((response) =>
      response.json()
    );
  } catch (error) {
    throw new Error("Something went wrong when deleting card.");
  }
};

export const createNew = async (card: Partial<Card>): Promise<Card> => {
  try {
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getEditable(card)),
    }).then((response) => response.json());
  } catch (error) {
    throw new Error("Something went wrong when creating the card.");
  }
};

export const modify = async (id: string, card: Partial<Card>) => {
  try {
    return await fetch(`${url}${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    }).then((response) => response.json());
  } catch (error) {
    throw new Error("Something went wrong when editing the card.");
  }
};
