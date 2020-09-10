let fr = {
    common: {
        "Welcome to React": "Bienvenue sur React et react-i18next",
        "date": "Date",
        "loading": "Chargement ...",
        "placeholder": "Rechercher..."
    },

    navbar: {
        "home": "Accueil",
        "rents": "Emprunts",
        "rent_requests": "Demande d'emprunts",
        "poleData": "Gestion des pôles",
        "fuels": "Carburants",
        "carmodels": "Modèles de véhicule",
        "brands": "Marques",
        "vehicles": "Véhicules"
    },

    home: {
        "title": {
            "welcome": "Bienvenue sur le site de gestion de flotte de véhicule"
        }
    },

    counter: {
        "title": "Compteur",
        "subtitle": "Ceci est un exemple d'un composant React.",
        "counter": "Nombre actuel : ",
        "increment": "Incrémenter"
    },

    loans: {
        "title": "Emprunts"
    },

    fetch_data: {
        "title": "Prévisions météo",
        "subtitle": "Ceci est un composant affichant les prévisions météo du serveur.",
        "summary": "Résumé",
        "temp_c": "Temp. (°C)",
        "temp_f": "Temp. (°F)",
        "weather": {
            "Freezing": "Gelée",
            "Bracing": "Tonifiant",
            "Chilly": "Froid",
            "Cool": "Frais",
            "Mild": "Doux",
            "Warm": "Chaud",
            "Balmy": "Doux",
            "Hot": "Chaud",
            "Sweltering": "Etouffant",
            "Scorching": "Brûlant"
        }
    },

    api_authorization: {
        "logout": "Se déconnecter",
        "login": "Se connecter",
        "register": "Créer un compte",
        "hello": "Bonjour {{name}}",

        "processing_login": "Traitement de la connexion",
        "processing_login_call": "Traitement du rappel de la connexion",

        "error_msg": {
            "invalid_logout": "La déconnexion n'a pas été lancée depuis la page.",
            "invalid_action": "Action invalide '{{action}}'",
            "invalid_auth": "Le status de l'authentification est invalide.",
            "redirect": "Ne devrait pas rediriger.",
            "invalid_url": "Url de retour invalide. L'url de retour doit avoir la même origine que la page actuelle.",
            "invalid_status": "Status du résultat invalide '{{status}}'.",
            "invalid_auth_status": "Status de l'authetification invalide '{{status}}'.",
        },

        "success_msg": {
            "logout": "Vous êtes déconnecté avec success !"
        }
    },

    pole_data: {
        "title": "Gestion des pôles",
        "subtitle": "Cette fenêtre nous affiche la liste des pôles.",
        "name": "Nom",
        "address": "Adresse",
        "city": "Ville",
        "actions": "Actions",
        "button": {
            "add": "Ajouter",
            "delete": "Supprimer",
            "edit": "Modifier"
        },
        "modal_edit_title": "Modification du pôles",
        "modal_edit_name": "Nom",
        "modal_edit_address": "Adresse",
        "modal_edit_city": "Ville",
        "modal_edit_cp": "CP",
        "modal_edit_button_edit": "Modifier",
        "modal_edit_button_close": "Fermer",
        "modal_add_title": "Ajouter un pôle",
        "modal_add_name": "Nom",
        "modal_add_address": "Adresse",
        "modal_add_city": "Ville",
        "modal_add_cp": "CP",
        "modal_add_button_add": "Ajouter",
        "modal_add_button_close": "Fermer"
    },
    vehicle_data: {
        "title": "Gestion des véhicules",
        "subtitle": "Cette fenêtre affiche la liste des véhicules.",
        "name": "Nom",
        "model_name": "Modèle",
        "color": "Couleur",
        "fuel": "Carburant",
        "km": "Km",
        "pole": "Pôle",
        "nbSeats": "SeatsPlaces",
        "registration": "Immatriculation",
        "address": "Adresse",
        "city": "Ville",
        "actions": "Actions",
        "button": {
            "add": "Ajouter",
            "delete": "Supprimer",
            "edit": "Modifier"
        },
        "modal_edit_title": "Modifier un véhicule",
        "modal_edit_pole": "Pôle",
        "modal_edit_name": "Nom",
        "modal_edit_color": "Couleur",
        "modal_edit_fuel": "Carburant",
        "modal_edit_model": "Modèle",
        "modal_edit_registration": "Immatriculation",
        "modal_edit_kilometer": "Kilomètres",
        "modal_edit_date_mec": "Date de mise en circulation",
        "modal_edit_is_active": "Actif",
        "modal_edit_button_close": "Fermer",
        "modal_edit_button_edit": "Modifier",

        "modal_add_title": "Ajouter un véhicule",
        "modal_add_pole": "Pôle",
        "modal_add_name": "Nom",
        "modal_add_color": "Couleur",
        "modal_add_fuel": "Carburant",
        "modal_add_model": "Modèle",
        "modal_add_registration": "Immatriculation",
        "modal_add_kilometer": "Kilomètres",
        "modal_add_date_mec": "Date de mise en circulation",
        "modal_add_is_active": "Actif",
        "modal_add_button_close": "Fermer",
        "modal_add_button_edit": "Ajouter"
    },
    carmodel: {
        "title": "Gestion des modèles de véhicules",
        "subtitle": "Cette pagepermet de gérer les modèles de véhicules.",
        "name": "Nom",
        "nb_seat": "Places",
        "brand": "Marque",
        "actions": "Actions",
        "button_add": "Ajouter",
        "button_edit": "Modifier",
        "button_delete": "Supprimer",
        "modal_add_title": "Ajouter un modèle",
        "modal_name_label": "Nom",
        "modal_number_seat": "Nombre de places",
        "modal_brand": "Marque",
        "modal_button_add": "Ajouter",
        "modal_button_edit": "Modifier",
        "modal_button_close": "Fermer"
    },
    rent_data:
    {
        "title": "Gestion des Trajets",
        "subtitle": "Cette fenêtre nous affiche la liste des trajets.",
        "name": "Nom",
        "address": "Adresse",
        "subscription": "Refuser",
        "start": "Départ",
        "finish": "Arrivée",
        "nbSeats": "Places restantes",
        "the": "Le ",
        "at": "Au pôle ",
        "city": "Ville",
        "actions": "Actions",
        "button": {
            "add": "Ajouter",
            "delete": "Supprimer",
            "subscription": "Refuser",
            "edit": "Modifier"
        }
    },
    rent_request_data:
    {
        "title": "Gestion des demandes de trajets",
        "subtitle": "Cette fenêtre nous affiche la liste des demandes de trajets.",
        "name": "Nom",
        "address": "Adresse",
        "city": "Ville",
        "actions": "Actions",
        "button": {
            "add": "Ajouter",
            "delete": "Supprimer",
            "edit": "Modifier"
        }
    },
    fuel: {
        "title": "Gestion des fuels",
        "subtitle": "Cette fenêtre nous affiche la liste des fuels.",
        "name": "Nom",
        "button": {
            "add": "Ajouter",
            "delete": "Supprimer",
            "edit": "Modifier"
        },
        "modal_add_title": "Ajouter un carburant",
        "modal_add_name": "Nom",
        "modal_add_button_add": "Ajouter",
        "modal_add_button_close": "Fermer",
        "modal_edit_title": "Modifier un carburant",
        "modal_edit_name": "Nom",
        "modal_edit_button_edit": "Modifier",
        "modal_edit_button_close": "Fermer",
    },
    brand: {
        "title": "Gestion des marques",
        "subtitle": "Cette fenêtre nous affiche la liste des marques.",
        "name": "Nom",
        "button": {
            "add": "Ajouter",
            "delete": "Supprimer",
            "edit": "Modifier"
        },
        "modal_add_title": "Ajouter une marque",
        "modal_add_name": "Nom",
        "modal_add_button_add": "Ajouter",
        "modal_add_button_close": "Fermer",
        "modal_edit_title": "Modifier une marque",
        "modal_edit_name": "Nom",
        "modal_edit_button_edit": "Modifier",
        "modal_edit_button_close": "Fermer",
    },
    rent_requests_data: {
        "title": "Gestion des demandes de trajets",
        "subtitle": "Cette fenêtre nous affiche la liste des demandesde trajets.",
        "the": "Le ",
        "at": "Au pôle ",
        "button": {
            "validate": "Valider",
            "refuse": "Refuser"
        }
    }
};

export default fr;