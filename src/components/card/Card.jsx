export default function Card(props) {
   console.log(props);

   return (
      <div style={{
         backgroundColor: "grey",
         margin: "20px",
         padding: "20px",
         borderRadius: "15px",
      }}
      >
         <button onClick={props.onClose}>X</button>
         <h2>{props.name}</h2>
         <h4>Status: {props.name}</h4>
         <h4>Specie: {props.status}</h4>
         <h4>Gender: {props.gender}</h4>
         <h4>Origin: {props.origin.name}</h4>
         <img src={props.image} alt={props.image} />
      </div>
   );
}
