'use strict';

const e = React.createElement;

class Music extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch('https://itunes.apple.com/in/rss/topalbums/limit=100/json')
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.feed
                    });
                }
            )
            .catch(
                this.setState({
                    isLoaded: true,
                    error
                })
            );
    }

    render() {
        const { error, isLoaded, items }  = this.state;
        const media = items.entry.im
        const author = items.author;
        if (error) {
            return <div> Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.name}>
                            {item.name.label} {item.price.label}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

const domContainer = document.querySelector('#music_container');
ReactDOM.render(e(Music), domContainer);