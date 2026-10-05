document.getElementById('submitBtn').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    const fileInput = document.getElementById('mediaUpload');
    const selectedFile = fileInput.files[0]; 

    const placeholderText = document.getElementById('placeholderText');
    const resultArea = document.getElementById('resultArea');
    const summaryText = document.getElementById('summaryText');
    const loading = document.getElementById('loading');
    const submitBtn = document.getElementById('submitBtn');

    if (!inputText.trim() && !selectedFile) {
        alert("Please enter some text or upload a PDF/Photo to summarize!");
        return;
    }

    placeholderText.classList.add('hidden');
    resultArea.classList.add('hidden');
    loading.classList.remove('hidden');
    submitBtn.disabled = true;
    submitBtn.innerText = "Processing...";

    try {
        const formData = new FormData();
        
        if (selectedFile) {
            formData.append('mediaFile', selectedFile); 
        } 
        if (inputText.trim()) {
            formData.append('text', inputText);
        }

        const response = await fetch('http://localhost:3000/api/summarize', {
            method: 'POST',
            body: formData 
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.error || "Something went wrong.");
        }

        // Yahan Markdown parse hokar proper HTML (Headings/Bullets) banega
        summaryText.innerHTML = marked.parse(data.summary); 
        
        summaryText.classList.remove('error-text');
        resultArea.classList.remove('hidden');

    } catch (error) {
        summaryText.innerText = "Error: " + error.message;
        summaryText.classList.add('error-text');
        resultArea.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.innerText = "Summarize Now";
    }
});