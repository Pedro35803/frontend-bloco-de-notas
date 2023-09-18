const baseUrl = process.env.REACT_APP_API_URL;

export const login = async ({ email, password }) => {
    const config = {
        method: "POST",
        body: { email, password }
    }

    const response = await fetch(`${baseUrl}/login`, config);
    const content = response.json();

    if (!response.ok)
        throw new Error(content.message);

    return content;
}

export const createUser = async ({ name, email, password }) => {
    const config = {
        method: "POST",
        body: { name, email, password }
    }
    
    const response = await fetch(`${baseUrl}/register`, config);
    const content = response.json();

    if (!response.ok)
        throw new Error(content.message);

    return content;
}