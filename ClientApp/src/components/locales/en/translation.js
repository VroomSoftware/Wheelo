let en = {
    common: {
        "Welcome to React": "Welcome to React and react-i18next",
        "date": "Date",
        "loading": "Loading ...",
        "placeholder": "Search..."
    },

    navbar: {
        "home": "Home",
        "counter": "Counter",
        "fetchData": "Fetch data",
        "fuels": "Fuels",
        "rent_requests": "Rent requests",
        "rents": "Rents",
        "carmodels": "Car models",
        "brands": "Brands",
        "poleData": "Poles management",
        "vehicles": "Vehicles"
    },

    home: {
        "title": {
            "welcome": "Welcome to the vehicle fleet management site"
        }
    },

    counter: {
        "title": "Counter",
        "subtitle": "This is a simple example of a React component.",
        "counter": "Current count: ",
        "increment": "Increment"
    },

    loans: {
        "title": "Loans"
    },

    fetch_data: {
        "title": "Weather Forecast",
        "subtitle": "This component demonstrates fetching data from the server.",
        "summary": "Summary",
        "temp_c": "Temp. (°C)",
        "temp_f": "Temp. (°F)",
        "weather": {
            "Freezing": "Freezing",
            "Bracing": "Bracing",
            "Chilly": "Chilly",
            "Cool": "Cool",
            "Mild": "Mild",
            "Warm": "Warm",
            "Balmy": "Balmy",
            "Hot": "Hot",
            "Sweltering": "Sweltering",
            "Scorching": "Scorching"
        }
    },

    api_authorization: {
        "logout": "Logout",
        "login": "Login",
        "register": "Register",
        "hello": "Hello {{name}}",

        "processing_login": "Processing login",
        "processing_login_call": "Processing login callback",

        "error_msg": {
            "invalid_logout": "The logout was not initiated from within the page.",
            "invalid_action": "Invalid action '{{action}}'",
            "invalid_auth": "Invalid authentication result status.",
            "redirect": "Should not redirect.",
            "invalid_url": "Invalid return url. The return url needs to have the same origin as the current page.",
            "invalid_status": "Invalid status result {{status}}.",
            "invalid_auth_status": "Invalid authentifacation result status {{status}}.",
        },

        "success_msg": {
            "logout": "You successfully logged out!"
        }
    },

    pole_data: {
        "title": "Poles management",
        "subtitle": "This windows shows us the poles list.",
        "name": "Name",
        "address": "Address",
        "city": "City",
        "actions": "Actions",
        "button": {
            "add": "Add",
            "delete": "Delete",
            "edit": "Edit"
        },
        "modal_edit_title": "Edit Pole",
        "modal_edit_name": "Name",
        "modal_edit_address": "Address",
        "modal_edit_city": "City",
        "modal_edit_cp": "PC",
        "modal_edit_button_edit": "Edit Pole",
        "modal_edit_button_close": "Close",
        "modal_add_title": "Add Pole",
        "modal_add_name": "Name",
        "modal_add_address": "Address",
        "modal_add_city": "City",
        "modal_add_cp": "PC",
        "modal_add_button_add": "Add Pole",
        "modal_add_button_close": "Close"
    },
    vehicle_data: {
        "title": "Vehicles",
        "subtitle": "This windows shows us the vehicles list.",
        "name": "Name",
        "model_name": "Model",
        "color": "Color",
        "fuel": "Fuel",
        "km": "Km",
        "pole": "Pole",
        "nbSeats": "Seats",
        "registration": "Registration",
        "address": "Address",
        "city": "City",
        "actions": "Actions",
        "button": {
            "add": "Add",
            "delete": "Delete",
            "edit": "Edit"
        },
        "modal_edit_title": "Edit Vehicle",
        "modal_edit_pole": "Pole",
        "modal_edit_name": "Name",
        "modal_edit_color": "Color",
        "modal_edit_fuel": "Fuel",
        "modal_edit_model": "Model",
        "modal_edit_registration": "Registration",
        "modal_edit_kilometer": "Kilometers",
        "modal_edit_date_mec": "Date of issue",
        "modal_edit_is_active": "Is active",
        "modal_edit_button_close": "Close",
        "modal_edit_button_edit": "Edit",

        "modal_add_title": "Add Vehicle",
        "modal_add_pole": "Pole",
        "modal_add_name": "Name",
        "modal_add_color": "Color",
        "modal_add_fuel": "Fuel",
        "modal_add_model": "Model",
        "modal_add_registration": "Registration",
        "modal_add_kilometer": "Kilometers",
        "modal_add_date_mec": "Date of issue",
        "modal_add_is_active": "Is active",
        "modal_add_button_close": "Close",
        "modal_add_button_edit": "Add"
    },
    carmodel: {
        "title": "Car model management",
        "subtitle": "This page is to manage all car model from the company.",
        "name": "Name",
        "nb_seat": "Seats",
        "brand": "Brand",
        "actions": "Actions",
        "button_add": "Add",
        "button_edit": "Edit",
        "button_delete": "Delete",
        "modal_add_title": "Add a car model",
        "modal_name_label": "Name",
        "modal_number_seat": "Number of seats",
        "modal_brand": "Brand",
        "modal_button_add": "Add car model",
        "modal_button_edit": "Edit car model",
        "modal_button_close": "Close"
    },
    fuel: {
        "title": "Fuel Management",
        "subtitle": "This window displays the list of fuels.",
        "name": "Name",
        "button": {
            "add": "Add",
            "delete": "Delete",
            "edit": "Edit"
        },
        "modal_add_title": "Add Fuel",
        "modal_add_name": "Name",
        "modal_add_button_add": "Add fuel",
        "modal_add_button_close": "Close",
        "modal_edit_title": "Edit Fuel",
        "modal_edit_name": "Name",
        "modal_edit_button_edit": "Edit fuel",
        "modal_edit_button_close": "Close",
    },
    brand: {
        "title": "Brand Management",
        "subtitle": "This window displays the list of brands.",
        "name": "Name",
        "button": {
            "add": "Add",
            "delete": "Delete",
            "edit": "Edit"
        },
        "modal_add_title": "Add Brand",
        "modal_add_name": "Name",
        "modal_add_button_add": "Add brand",
        "modal_add_button_close": "Close",
        "modal_edit_title": "Edit brand",
        "modal_edit_name": "Name",
        "modal_edit_button_edit": "Edit brand",
        "modal_edit_button_close": "Close",
    },
    rent_data:
    {
        "title": "Rent Management",
        "subtitle": "",
        "name": "Name",
        "address": "Address",
        "start": "Start",
        "finish": "Finish",
        "nbSeats": "Nb seats",
        "the": "The ",
        "at": "At ",
        "city": "City",
        "actions": "Actions",
        "button": {
            "add": "Add",
            "delete": "Delete",
            "edit": "Edit",
            "subscription": "Refuse"
        }
    },
    rent_requests_data: {
        "title": "Rent requests management",
        "subtitle": "This window displays the list of rent requests.",
        "the": "The ",
        "at": "At ",
        "button": {
            "validate": "Validate",
            "refuse": "Refuse"
        }
    }
};

export default en;