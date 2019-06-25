class Image {
  constructor(userInfo, imagePosted) {
    this.authorname = userInfo.name;
    this.imageUrl = imagePosted;
    this.date = Date.now();
  }
}

module.exports = Image;
