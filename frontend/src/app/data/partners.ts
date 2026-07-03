export const partners: Record<
  string,
  {
    provider: string;
    partnerPrice: number;
    url: string;
  }
> = {
  Téléphone: {
    provider: "Free Mobile",
    partnerPrice: 19.99,
    url: "#",
  },

  Internet: {
    provider: "Freebox",
    partnerPrice: 29.99,
    url: "#",
  },

  Assurance: {
    provider: "LeLynx",
    partnerPrice: 35,
    url: "#",
  },

  Électricité: {
    provider: "Octopus Energy",
    partnerPrice: 90,
    url: "#",
  },
};