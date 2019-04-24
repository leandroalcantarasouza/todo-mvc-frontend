class TodoDTO {
  constructor(content) {
    this.content = content || "";
  }

  getContent() {
    return this.content;
  }
}

export default TodoDTO;
