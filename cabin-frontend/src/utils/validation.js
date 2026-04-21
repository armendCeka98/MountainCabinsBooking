const validators = {
    required: (value) => {
        if (!value || value.trim() === "") {
            return "This field is required";
        }
        return null;
    },
    email: (value) => {
        if (!value) return "Email is required";

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(value)) {
            return "Invalid email address";
        }

        return null;
    },
    number: (value) => {
        if (isNaN(value)) {
            return "Must be a number";
        }
        return null;
    },
    minLength: (value, length) => {
        if (value.length < length) {
          return `Minimum ${length} characters`;
        }
        return null;
    }
};

export const validateField = (value, rules = []) => {
    for (let rule of rules) {
        if (typeof rule === "string") {
            const error = validators[rule](value);
            if (error) return error;
        }

        if (typeof rule === "object") {
            const [key, param] = Object.entries(rule)[0];
            const error = validators[key](value, param);
            if (error) return error;
        }
    }

    return null;
};