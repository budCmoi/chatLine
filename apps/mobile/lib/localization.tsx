import { getLocales } from 'expo-localization';
import { createContext, useContext, useMemo, type PropsWithChildren } from 'react';

export type AppLocale = 'en' | 'fr';

const translations = {
  en: {
    appName: 'Chatline',
    notFoundCode: '404',
    notFoundTitle: 'Route not found.',
    notFoundBody: 'Return to the main assistant workspace.',
    goHome: 'Go home',
    brandTagline: 'Your AI workspace, streamlined for everyday conversations.',
    startChat: 'Start a chat',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    drawerTitle: 'Conversations',
    drawerSubtitle: 'Recent chats sorted by activity',
    drawerEmpty: 'No active conversation yet.',
    drawerHome: 'Home',
    drawerNewChat: 'New chat',
    drawerProfile: 'Profile',
    chatOptions: 'Options',
    chatOptionsSubtitle: 'Choose a free model and conversation mode.',
    chatInputPlaceholder: 'Ask anything...',
    chatEmptyTitle: 'No messages yet',
    chatEmptyBody: 'Start with a short prompt and Chatline will create the conversation automatically.',
    freeBadge: 'Free',
    premiumBadge: 'Premium',
    modeStandard: 'Standard',
    modeExpert: 'Expert mode',
    expertLocked: 'Premium only',
    overlayTitle: 'You reached the free limit',
    overlayBody: 'Chatline Free includes 5 assisted requests. Upgrade for Expert mode and a higher quota.',
    overlayUpgrade: 'Go premium',
    overlayContinue: 'Continue with limits',
    overlayCounter: 'Free requests used',
    homeEyebrow: 'AI ASSISTANT',
    homeTitle: 'A cleaner way to start every conversation.',
    homeSubtitle:
      'Chatline keeps the workspace focused: start a chat, revisit recent threads from the drawer, and unlock deeper tools only when you need them.',
    homeCta: 'Start a chat',
    homeSecondary: 'Chatline Plus from \u20ac8.99 / month',
    homeGreeting: 'Hello, {name}.',
    homeQuickImage: 'Create an image',
    homeQuickIdea: 'Give me an idea',
    homeQuickChecklist: 'Make a checklist',
    homeQuickChat: 'Open a chat',
    profileEyebrow: 'PROFILE',
    profileTitle: 'Account, preferences and subscription controls.',
    profileSubtitle: 'Everything related to your plan, notifications, data and sessions stays in one place.',
    accountSection: 'Account',
    subscriptionSection: 'Subscription',
    personalizationSection: 'Personalization',
    notificationsSection: 'Notifications',
    dataSection: 'Data management',
    archivedSection: 'Archived chats',
    securitySection: 'Security',
    actionsSection: 'Actions',
    emailLabel: 'Email',
    aliasLabel: 'Alias',
    toneLabel: 'Conversation tone',
    interfaceColorLabel: 'Interface color',
    notificationProduct: 'Product updates',
    notificationBilling: 'Billing',
    notificationSecurity: 'Security alerts',
    subscriptionStatus: 'Status',
    upgradeCta: 'Upgrade to Chatline Plus',
    deleteChat: 'Delete current chat',
    deleteAllData: 'Delete all data',
    exportData: 'Export data',
    viewArchived: 'Open archived chats',
    activeSessions: 'Active sessions',
    manageSessions: 'Close other sessions',
    deleteAccount: 'Delete account',
    signOut: 'Sign out',
    archivedEyebrow: 'ARCHIVED CHATS',
    archivedTitle: 'Stored threads you can revisit anytime.',
    archivedSubtitle: 'Archived conversations stay separated from the main drawer but remain accessible.',
    restoreChat: 'Restore',
    archivedEmpty: 'No archived chat yet.',
    premiumEyebrow: 'CHATLINE PLUS',
    premiumTitle: 'Upgrade to the faster, deeper workspace.',
    premiumSubtitle: 'Unlock Expert mode, a larger request allowance and a more capable workflow for daily use.',
    premiumPrice: '€8.99 / month',
    premiumBenefits: 'Benefits',
    premiumCompare: 'Free vs Premium',
    premiumCta: 'Upgrade now',
    premiumFeatureExpert: 'Expert mode',
    premiumFeatureQuota: 'Expanded request quota',
    premiumFeaturePriority: 'Priority routing',
    premiumFeatureThemes: 'Advanced personalization',
    freePlan: 'Free',
    premiumPlan: 'Premium',
    freeQuota: '5 requests then limited mode',
    premiumQuota: 'Extended usage and expert tools',
    toneBalanced: 'Balanced',
    toneDirect: 'Direct',
    toneStrategic: 'Strategic',
    interfaceGold: 'Gold',
    interfaceViolet: 'Violet',
    interfaceGraphite: 'Graphite',
    sessionCurrent: 'Current device',
    sessionDesktop: 'Desktop browser',
    sessionMobile: 'Mobile app',
    archiveCurrentChat: 'Archive current chat',
    currentChatLabel: 'Current chat',
    noCurrentChat: 'No chat selected',
    freeProvidersTitle: 'Available models',
    statusFree: 'Free plan',
    statusPremium: 'Premium plan',
    profileDescription: 'Manage account and product settings',
  },
  fr: {
    appName: 'Chatline',
    notFoundCode: '404',
    notFoundTitle: 'Route introuvable.',
    notFoundBody: 'Retourner vers l’espace principal de discussion.',
    goHome: 'Retour accueil',
    brandTagline: 'Votre espace IA, simplifie pour les conversations du quotidien.',
    startChat: 'Commencer un chat',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    drawerTitle: 'Conversations',
    drawerSubtitle: 'Discussions recentes triees par activite',
    drawerEmpty: 'Aucune conversation active pour le moment.',
    drawerHome: 'Accueil',
    drawerNewChat: 'Nouveau chat',
    drawerProfile: 'Profil',
    chatOptions: 'Options',
    chatOptionsSubtitle: 'Choisissez un modele gratuit et le mode de discussion.',
    chatInputPlaceholder: 'Posez votre question...',
    chatEmptyTitle: 'Aucun message pour le moment',
    chatEmptyBody: 'Commencez avec une demande courte et Chatline creera la conversation automatiquement.',
    freeBadge: 'Gratuit',
    premiumBadge: 'Premium',
    modeStandard: 'Standard',
    modeExpert: 'Mode expert',
    expertLocked: 'Reserve au premium',
    overlayTitle: 'Vous avez atteint la limite gratuite',
    overlayBody: 'Chatline Free inclut 5 requetes assistees. Passez au premium pour debloquer le mode expert et un quota plus large.',
    overlayUpgrade: 'Passer premium',
    overlayContinue: 'Continuer en limite',
    overlayCounter: 'Requetes gratuites utilisees',
    homeEyebrow: 'ASSISTANT IA',
    homeTitle: 'Une facon plus claire de lancer chaque conversation.',
    homeSubtitle:
      'Chatline garde l’espace concentre sur l’essentiel : demarrer un chat, retrouver les discussions recentes dans la sidebar et debloquer les fonctions avancees seulement si necessaire.',
    homeCta: 'Commencer un chat',
    homeSecondary: 'Chatline Plus a 8,99\u20ac / mois',
    homeGreeting: 'Bonjour, {name}.',
    homeQuickImage: 'Creer une image',
    homeQuickIdea: 'Donne-moi une idee',
    homeQuickChecklist: 'Faire une checklist',
    homeQuickChat: 'Lancer un chat',
    profileEyebrow: 'PROFIL',
    profileTitle: 'Compte, preferences et abonnement au meme endroit.',
    profileSubtitle: 'Tout ce qui concerne votre plan, vos notifications, vos donnees et vos sessions reste centralise.',
    accountSection: 'Compte',
    subscriptionSection: 'Abonnement',
    personalizationSection: 'Personnalisation',
    notificationsSection: 'Notifications',
    dataSection: 'Gestion des donnees',
    archivedSection: 'Chats archives',
    securitySection: 'Securite',
    actionsSection: 'Actions',
    emailLabel: 'Adresse email',
    aliasLabel: 'Alias',
    toneLabel: 'Ton de discussion',
    interfaceColorLabel: 'Couleur interface',
    notificationProduct: 'Mises a jour produit',
    notificationBilling: 'Paiement',
    notificationSecurity: 'Alertes de securite',
    subscriptionStatus: 'Statut',
    upgradeCta: 'Mettre a niveau vers Chatline Plus',
    deleteChat: 'Supprimer le chat courant',
    deleteAllData: 'Supprimer toutes les donnees',
    exportData: 'Exporter les donnees',
    viewArchived: 'Ouvrir les chats archives',
    activeSessions: 'Sessions actives',
    manageSessions: 'Fermer les autres sessions',
    deleteAccount: 'Supprimer le compte',
    signOut: 'Se deconnecter',
    archivedEyebrow: 'CHATS ARCHIVES',
    archivedTitle: 'Des conversations conservees et faciles a retrouver.',
    archivedSubtitle: 'Les conversations archivees restent separees de la sidebar principale mais accessibles a tout moment.',
    restoreChat: 'Restaurer',
    archivedEmpty: 'Aucun chat archive pour le moment.',
    premiumEyebrow: 'CHATLINE PLUS',
    premiumTitle: 'Passez a un espace plus rapide et plus profond.',
    premiumSubtitle: 'Debloquez le mode expert, un quota etendu et un workflow plus complet pour un usage quotidien.',
    premiumPrice: '8,99€ / mois',
    premiumBenefits: 'Avantages',
    premiumCompare: 'Gratuit vs Premium',
    premiumCta: 'Passer au premium',
    premiumFeatureExpert: 'Mode expert',
    premiumFeatureQuota: 'Quota de requetes etendu',
    premiumFeaturePriority: 'Routage prioritaire',
    premiumFeatureThemes: 'Personnalisation avancee',
    freePlan: 'Gratuit',
    premiumPlan: 'Premium',
    freeQuota: '5 requetes puis mode limite',
    premiumQuota: 'Usage etendu et fonctions expertes',
    toneBalanced: 'Equilibre',
    toneDirect: 'Direct',
    toneStrategic: 'Strategique',
    interfaceGold: 'Jaune',
    interfaceViolet: 'Violet',
    interfaceGraphite: 'Graphite',
    sessionCurrent: 'Appareil actuel',
    sessionDesktop: 'Navigateur desktop',
    sessionMobile: 'Application mobile',
    archiveCurrentChat: 'Archiver le chat courant',
    currentChatLabel: 'Chat courant',
    noCurrentChat: 'Aucun chat selectionne',
    freeProvidersTitle: 'Modeles disponibles',
    statusFree: 'Plan gratuit',
    statusPremium: 'Plan premium',
    profileDescription: 'Gerer le compte et les reglages produit',
  },
} as const;

export type TranslationKey = keyof (typeof translations)['en'];

interface LocalizationContextValue {
  locale: AppLocale;
  t: (key: TranslationKey) => string;
}

const defaultLocale = resolveAppLocale(getLocales()[0]?.languageTag);

const LocalizationContext = createContext<LocalizationContextValue>({
  locale: defaultLocale,
  t: (key) => translations[defaultLocale][key],
});

export function LocalizationProvider({ children }: PropsWithChildren) {
  const locale = useMemo(() => resolveAppLocale(getLocales()[0]?.languageTag), []);
  const value = useMemo<LocalizationContextValue>(
    () => ({
      locale,
      t: (key) => translations[locale][key],
    }),
    [locale],
  );

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export function useI18n(): LocalizationContextValue {
  return useContext(LocalizationContext);
}

export function resolveAppLocale(languageTag?: string): AppLocale {
  if (!languageTag) {
    return 'en';
  }

  return languageTag.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export function formatConversationDate(locale: AppLocale, value: string): string {
  const date = new Date(value);
  const now = new Date();
  const sameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    hour: sameDay ? '2-digit' : undefined,
    minute: sameDay ? '2-digit' : undefined,
    day: sameDay ? undefined : '2-digit',
    month: sameDay ? undefined : 'short',
  }).format(date);
}

export function formatMessageTime(locale: AppLocale, value: string): string {
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}
