export default ({ setRoute }: any) => {
    return (
        <div className="ui menu black" style={{ 'marginTop': '5px' }}>
            <a href="/#" className="ui header item" onClick={() => setRoute(0)}>Funding</a>
            <div className="right menu">
                <a href="/#" className="item" onClick={() => setRoute(1)}>Create Campaign</a>
            </div>
            <a href="/#" className="ui header item" onClick={() => setRoute(3)}>Get All Donated Users</a>
        </div>
    );
};