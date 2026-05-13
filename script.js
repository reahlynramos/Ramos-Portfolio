AOS.init({
  duration:1000,
  once:true
});





const canvas = document.getElementById('bgCanvas');
        const ctx = canvas.getContext('2d');

        // Resize canvas to fill the window
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Ball configuration
        const balls = [];
        const numberOfBalls = 15; 

        class Ball {
            constructor() {
                this.radius = Math.random() * 15 + 10; // Random radius between 10 and 25
                this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
                this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
                // Random speeds between -4 and 4 (excluding 0)
                this.dx = (Math.random() - 0.5) * 3 || 3;
                this.dy = (Math.random() - 0.5) * 3 || 3;
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                
                // Create neon blue glowing effect
                ctx.shadowColor = '#00d2ff';
                ctx.shadowBlur = 25;
                
                // Gradient fill for a 3D sphere look
                let gradient = ctx.createRadialGradient(
                    this.x - this.radius/3, this.y - this.radius/3, this.radius/10,
                    this.x, this.y, this.radius
                );
                gradient.addColorStop(0, '#ffffff'); // Bright center
                gradient.addColorStop(0.2, '#00d2ff'); // Cyan glow
                gradient.addColorStop(1, '#021430'); // Deep blue edge
                
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.closePath();
                ctx.restore();
            }

            update() {
                // Bounce off left and right edges
                if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }

                // Bounce off top and bottom edges
                if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                    this.dy = -this.dy;
                }

                // Move ball position
                this.x += this.dx;
                this.y += this.dy;

                this.draw();
            }
        }

        // Initialize ball array
        for (let i = 0; i < numberOfBalls; i++) {
            balls.push(new Ball());
        }

        // Animation loop
        function animate() {
            // Slight opacity clear creates a subtle motion blur effect
            ctx.fillStyle = 'rgba(5, 5, 16, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            balls.forEach(ball => ball.update());

            requestAnimationFrame(animate);
        }

        animate();