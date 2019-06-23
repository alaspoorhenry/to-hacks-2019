class Media {
  constructor({
    mediaName,
    mediaBias,
    mediaAlignment,
    mediaReasoning,
    usernameID
  }) {
    this.mediaName = mediaName;
    this.mediaBias = mediaBias;
    this.mediaAlignment = mediaAlignment;
    this.mediaReasoning = mediaReasoning;
    this.usernameID = usernameID;
    this.date = new Date();
  }
}

module.exports = Media;
