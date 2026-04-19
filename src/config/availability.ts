// Override manuelle : ajuster quand Victor signe un client
// 0 = pill masquée (complet) · 1-3 = nombre de créneaux affiché
export const AVAILABLE_SLOTS = 2;

// Mois courant auto (après le 25, afficher le mois suivant)
export const getCurrentMonthLabel = (): string => {
  const months = ['janvier','février','mars','avril','mai','juin',
                  'juillet','août','septembre','octobre','novembre','décembre'];
  const now = new Date();
  const monthIndex = now.getDate() > 25
    ? (now.getMonth() + 1) % 12
    : now.getMonth();
  return months[monthIndex];
};
