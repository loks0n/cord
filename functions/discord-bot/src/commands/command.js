export const CommandType = {
  SLASH_COMMAND: 1,
};

export const CommandOptionType = {
  STRING: 3,
};

export class Command {
  constructor(name, type, description, options, action) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.options = options;
    this.action = action;
  }

  registration() {
    return {
      name: this.name,
      type: this.type,
      description: this.description,
      options: this.options,
    };
  }
}

export class CommandBuilder {
  constructor() {
    this.name = '';
    this.type = '';
    this.description = '';
    this.options = [];
    this.action = () => {};
  }

  name(name) {
    this.name = name;
    return this;
  }

  /**
   * @param {number} type
   */
  type(type) {
    this.type = type;
    return this;
  }

  /**
   * @param {string} description
   */
  description(description) {
    this.description = description;
    return this;
  }

  /**
   * @param {object} option
   */
  option(option) {
    this.options.push(option);
    return this;
  }

  /**
   * @param {Function} action
   */
  action(action) {
    this.action = action;
    return this;
  }

  build() {
    return new Command(
      this.name,
      this.type,
      this.description,
      this.options,
      this.action,
      this.aaction
    );
  }
}
