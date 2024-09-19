const butInstall = document.getElementById('buttonInstall');

// Store the event for later use
let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    
    // Save the event for later so you can trigger it later
    deferredPrompt = event;

    // Make the install button visible now that the event has been triggered
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        // Reset the deferredPrompt variable, since it can only be used once
        deferredPrompt = null;

        // Optionally, hide the install button after installation
        butInstall.style.display = 'none';

        console.log(`User choice: ${outcome}`);
    }
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // The app has been installed successfully
    console.log('PWA was installed', event);

    // Optionally, hide the install button or show a success message
    butInstall.style.display = 'none';
});
