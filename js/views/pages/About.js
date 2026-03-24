export default class About{
    async render(){
        console.log("render about");
        return ` 
        <section>
            <h2>About</h2>
            <p> Vous êtes sur la page about </p>
        </section>
        `;
    }
}