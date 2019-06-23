class Media {
  constructor({ mediaName, mediaBias, mediaAlignment, mediaReasoning }) {
    this.mediaName = mediaName;
    this.mediaBias = mediaBias;
    this.mediaAlignment = mediaAlignment;
    this.mediaReasoning = mediaReasoning;
    this.date = new Date();
  }
}

module.exports = Media;
