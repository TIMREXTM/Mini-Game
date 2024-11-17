let mouseX = 0;  // Maus X-Position
let mouseY = 0;  // Maus Y-Position
let isMouseDown = false;  // Flag für gedrückte Maustaste
let yaw = 0; // Horizontale Rotation der Kamera (Blickrichtung)
let pitch = 0; // Vertikale Rotation der Kamera (Blickrichtung)

// Funktion zum Initialisieren des Spiels
function initGame() {
    // Szene, Kamera und Renderer erstellen
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("game-3d-container").appendChild(renderer.domElement);

    // Brauner Boden hinzufügen
    const floorSize = 20; // Größe der Map (20x20)
    const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Braun
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Flach hinlegen
    scene.add(floor);

    // Spieler: Bild-Textur auf Plane anwenden (z.B. 1.png)
    const textureLoader = new THREE.TextureLoader();
    const playerTexture = textureLoader.load('player 1.jpg');  // Lade die Textur (Stelle sicher, dass '1.png' im richtigen Verzeichnis ist)
    const playerGeometry = new THREE.PlaneGeometry(2, 2); // Plane-Geometrie für den Spieler
    const playerMaterial = new THREE.MeshBasicMaterial({ map: playerTexture, side: THREE.DoubleSide });  // Textur auf das Material anwenden
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.y = 1; // Über dem Boden positionieren
    scene.add(player);

    // Kamera-Position initialisieren
    camera.position.set(0, 5, 10); // Position leicht oberhalb und hinter dem Spieler
    camera.lookAt(player.position);

    // Bewegungseingaben
    const movement = {
        forward: false,
        backward: false,
        left: false,
        right: false,
    };

    document.addEventListener("keydown", (event) => {
        if (event.key === "w") movement.forward = true;
        if (event.key === "s") movement.backward = true;
        if (event.key === "a") movement.left = true;
        if (event.key === "d") movement.right = true;
    });

    document.addEventListener("keyup", (event) => {
        if (event.key === "w") movement.forward = false;
        if (event.key === "s") movement.backward = false;
        if (event.key === "a") movement.left = false;
        if (event.key === "d") movement.right = false;
    });

    // Mausbewegung für Kamerasteuerung
    document.addEventListener('mousemove', (event) => {
        if (isMouseDown) {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;  // Normalisieren der Mausposition
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1; // Normalisieren der Mausposition
            yaw = mouseX * Math.PI;  // Horizontal drehen (um die Y-Achse)
            pitch = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, mouseY * Math.PI / 4)); // Vertikal drehen (um die X-Achse, limitieren auf ±45°)
        }
    });

    // Maustaste gedrückt halten, um die Maussteuerung zu aktivieren
    document.addEventListener('mousedown', () => {
        isMouseDown = true;
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    // Bewegungslogik
    const speed = 0.1;
    const boundaries = floorSize / 2 - 0.5; // Begrenzung auf dem Boden
    function movePlayer() {
        if (movement.forward) player.position.z -= speed;
        if (movement.backward) player.position.z += speed;
        if (movement.left) player.position.x -= speed;
        if (movement.right) player.position.x += speed;

        // Begrenzungen, damit der Spieler die Map nicht verlässt
        player.position.x = Math.max(-boundaries, Math.min(boundaries, player.position.x));
        player.position.z = Math.max(-boundaries, Math.min(boundaries, player.position.z));

        // Kamera dreht sich basierend auf der Mausbewegung
        camera.rotation.y = yaw; // Horizontale Drehung
        camera.rotation.x = pitch; // Vertikale Drehung

        // Kamera folgt immer dem Spieler
        camera.position.set(player.position.x, 5, player.position.z + 10); // Position hinter dem Spieler
        camera.lookAt(player.position); // Kamera immer auf den Spieler ausrichten
    }

    // Animationsloop
    function animate() {
        requestAnimationFrame(animate);
        movePlayer();
        renderer.render(scene, camera);
    }

    animate();
}

// Wartezeit für Willkommensnachricht
window.onload = function () {
    setTimeout(() => {
        document.getElementById("welcome-message").style.display = "none";
        initGame();
    }, 3000); // 3 Sekunden warten
};
