document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("yoga-modal");
    const closeModal = document.getElementById("close-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalVideo = document.getElementById("modal-video");
    const modalDescription = document.getElementById("modal-description");

    // Fetch JSON data
    fetch("data/yoga.json")
        .then((response) => response.json())
        .then((data) => {
            const yogaSections = data.yogaSections;

            // Attach click event to all view buttons
            document.querySelectorAll(".view-btn").forEach((button) => {
                button.addEventListener("click", (e) => {
                    const yogaCard = e.target.closest(".yoga-card");
                    const yogaType = yogaCard.dataset.yoga;
                    const poseId = yogaCard.dataset.pose;

                    // Find the section and pose from JSON
                    const section = yogaSections.find((s) => s.id === yogaType);
                    if (section) {
                        const pose = section.poses.find((p) => p.poseId === poseId);
                        if (pose) {
                            // Populate modal content
                            modalTitle.textContent = pose.title;
                            modalVideo.src = pose.videoUrl;
                            modalDescription.innerHTML = `
                                <h3 class="fancy-title">Step-by-Step Guide</h3>
                                <ul>
                                    ${pose.description.map((step, index) => `<li>Step ${index + 1}: ${step}</li>`).join("")}
                                </ul>
                            `;

                            // Show modal
                            modal.style.right = "0";
                        } else {
                            console.error(`Pose with ID "${poseId}" not found.`);
                        }
                    } else {
                        console.error(`Section with ID "${yogaType}" not found.`);
                    }
                });
            });
        })
        .catch((error) => console.error("Error loading yoga.json:", error));

    // Close modal
    closeModal.addEventListener("click", () => {
        modal.style.right = "-100%";
        modalVideo.src = ""; // Stop the video
    });
});
