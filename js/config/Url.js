class Url {

    constructor() {
        this.link,
            this.str,
            this.file,
            this.query,
            this.value;

    }

    getLink() {
        this.link = window.location.href;



        return this.link;
    }

    fileName() {
        this.link = this.getLink();

        this.str = this.link.split('/');

        this.file = this.str[this.str.length - 1].split('?'); //  split() on the last element of this.str

        if (this.file.length > 1) {

            // console.log('with query', this.file[0]);
            return this.file[0];
        } else {
            this.filename = this.str[this.str.length - 1];
            // console.log('filename', this.filename);
            return this.filename;

        }

    }

    checkQuery() {
        this.link = this.getLink();
        this.str = this.link.split('?');

        if (this.str.length > 1) {
            //console.log('query available');
            return true;
        } else {
            //console.log('query unavailable');
            return false;
        }

    }

    getQuery() {
        this.link = this.getLink();
        this.str = this.link.split('?');
        this.split = this.str[this.str.length - 1];
        this.param = this.split.split('=')[0];
        this.value = this.split.split('=')[this.split.split('=').length - 1];

        console.log('parameter ' + this.param + '\n' + 'value: ' + this.value);

        return {

            'param': this.param,
            'value': this.value

        }
    }
}




