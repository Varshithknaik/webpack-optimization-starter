export function getMotivationalPictures() {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve([
          "images/motivational-pictures/photo1.webp",
          "images/motivational-pictures/photo2.webp",
          "images/motivational-pictures/photo3.webp",
        ]),
      700
    );
  });
}
