
const stringLinkRegex = 'https?://(www\\.)?[-a-zA-ZА-Яа-я0-9@:%._\\+~#=]{2,256}\\.[А-Яа-яa-z]{2,4}\\b([-a-zA-ZА-Яа-я0-9@:%_\\+.~#?&//=]*)'
const regex = '\\[(.*?)\\]\\(\(stringLinkRegex)\\)'.replace('stringLinkRegex', stringLinkRegex)

export default class RegExpHelper {
    constructor(props){
        this.links = [];
        this.text = props;

        while(this.text.match(regex)){
            let link = this.text.match(regex)[0]
            this.links.push({name: this.text.match(regex)[1], link: this.text.match(regex)[2]})
            this.text = this.text.replace(link, this.text.match(regex)[2])
        }
    }

    setLink(url){
        let link = ''
        this.links.map(item => {
            if(item.link === url)
            {
                link = item.name
            }
        })

        return(link ? link : url)
    }
}