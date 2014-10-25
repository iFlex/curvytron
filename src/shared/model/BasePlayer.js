/**
 * BasePlayer
 *
 * @param {String} client
 * @param {String} name
 * @param {String} color
 */
function BasePlayer(client, name, color)
{
    EventEmitter.call(this);

    this.client = client;
    this.name   = name;
    this.color  = typeof(color) !== 'undefined' ? color : this.getRandomColor();
    this.id     = null;
    this.ready  = false;
    this.avatar = null;
}

BasePlayer.prototype = Object.create(EventEmitter.prototype);
BasePlayer.prototype.constructor = BasePlayer;

/**
 * Max length for name
 *
 * @type {Number}
 */
BasePlayer.prototype.maxLength = 25;

/**
 * Max length for color
 *
 * @type {Number}
 */
BasePlayer.prototype.colorMaxLength = 20;

/**
 * Set name
 *
 * @param {String} name
 */
BasePlayer.prototype.setName = function(name)
{
    this.name = name;
};

/**
 * Set name
 *
 * @param {String} name
 */
BasePlayer.prototype.setColor = function(color)
{
    this.color = color;
};

/**
 * Equal
 *
 * @param {Player} player
 *
 * @return {Boolean}
 */
BasePlayer.prototype.equal = function(player)
{
    return this.id === player.id;
};

/**
 * Toggle Ready
 *
 * @param {Boolean} toggle
 */
BasePlayer.prototype.toggleReady = function(toggle)
{
    this.ready = typeof(toggle) !== 'undefined' ? (toggle ? true : false) : !this.ready;
};

/**
 * Get avatar
 *
 * @return {Avatar}
 */
BasePlayer.prototype.getAvatar = function()
{
    if (!this.avatar) {
        this.avatar = new Avatar(this);
    }

    return this.avatar;
};

/**
 * Reset player after a game
 */
BasePlayer.prototype.reset = function()
{
    this.avatar.destroy();

    this.avatar = null;
    this.ready  = false;
};

/**
 * Serialize
 *
 * @return {Object}
 */
BasePlayer.prototype.serialize = function()
{
    return {
        client: this.client.id,
        id: this.id,
        name: this.name,
        color: this.color,
        ready: this.ready
    };
};

/**
 * Get random Color
 *
 * @return {String}
 */
BasePlayer.prototype.getRandomColor = function()
{
    var color = '',
        randomNum = function () { return Math.ceil(Math.random() * 255).toString(16); };

    while (!this.validateColor(color, true)) {
        color = '#' + randomNum() + randomNum() + randomNum();
    }

    return color;
};

/**
 * Validatre color
 *
 * @param {String} color
 *
 * @return {Boolean}
 */
BasePlayer.prototype.validateColor = function(color, yiq)
{
    var matches = color.match(new RegExp('^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$'));



    if (matches && yiq) {
        var ratio = ((parseInt(matches[1], 16) * 0.4) + (parseInt(matches[2], 16) * 0.5) + (parseInt(matches[3], 16) * 0.3)) / 255;

        return ratio > 0.3;
    }

    return matches ? true : false;
};
