const processImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        body: formData,
    });
    return response.json();
}