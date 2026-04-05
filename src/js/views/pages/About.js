export default class About{
    async render(){
        console.log("render about");
        return ` 
        <section>
            <h2>About</h2>
            <p> Ce site a été réalisé par : Hachelef Asma, Blandin Pernelle </p>
        </section>
        `;
    }
}