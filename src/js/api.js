export function getMotivationalPictures() {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve([
          "images/motivational-pictures/photo1.jpg",
          "images/motivational-pictures/photo2.jpg",
          "images/motivational-pictures/photo3.jpg",
        ]),
      700
    );
  });
}
