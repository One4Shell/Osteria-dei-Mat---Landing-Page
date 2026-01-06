
import React from 'react';
import { Flame, Utensils, MapPin, Phone, Star, Clock } from 'lucide-react';
import { MenuItem, Review } from './types';

export const RESTAURANT_INFO = {
  name: "Osteria dei Mat",
  address: "Piazza del Popolo, 5, 18019 Vallecrosia Alta IM",
  phone: "+39 349 701 6395",
  whatsapp: "393497016395",
  rating: 4.8,
  reviewCount: 51,
  priceRange: "€20 - €30",
  cuisine: "Italiana, Barbecue, Pugliese",
  atmosphere: "Casual, Accogliente, Tranquillo",
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Fiorentina di Scottona',
    description: 'Carne frollata 45 giorni, cotta su brace di leccio e ulivo.',
    price: '€6.00/etto',
    category: 'meat',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800'
  },
  {
    id: '2',
    name: 'Bombette Pugliesi',
    description: 'Involtini di capocollo di maiale ripieni di formaggio canestrato.',
    price: '€14.00',
    category: 'traditional',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800'
  },
  {
    id: '3',
    name: 'Orecchiette al Ragù di Carne',
    description: 'Pasta fresca fatta in casa con ragù di tre tipi di carne.',
    price: '€12.00',
    category: 'traditional',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800'
  },
  {
    id: '4',
    name: 'Tagliere dello Chef',
    description: 'Selezione di salumi pugliesi e formaggi locali presidio Slow Food.',
    price: '€18.00',
    category: 'antipasti',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800'
  },
  {
    id: '5',
    name: 'Costine BBQ',
    description: 'Cotte a bassa temperatura per 12 ore, glassate con salsa della casa.',
    price: '€16.00',
    category: 'meat',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800'
  }
];

export const REVIEWS: Review[] = [
  {
    author: "Marco R.",
    rating: 5,
    text: "La miglior carne della zona. Lo chef macellaio sa davvero il fatto suo. Atmosfera magica nel borgo di Vallecrosia.",
    date: "2 settimane fa"
  },
  {
    author: "Elena V.",
    rating: 5,
    text: "Le bombette pugliesi sono spettacolari. Servizio impeccabile e molto accogliente.",
    date: "1 mese fa"
  },
  {
    author: "Giuseppe L.",
    rating: 4,
    text: "Qualità del cibo eccelsa. Rapporto qualità-prezzo ottimo per la tipologia di carne offerta.",
    date: "3 mesi fa"
  }
];

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Chi Siamo', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Prenota', href: '#reservation' },
  { label: 'Recensioni', href: '#reviews' },
  { label: 'Contatti', href: '#contact' },
];
