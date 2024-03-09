import { useEffect, useState } from "react";
import Table from "../components/Table";
import { getApi } from "../services/axios";



export default function Home() {


    const [peoples, setPeoples] = useState<string[]>([]);

    useEffect(() => {
        const onMount = async () => {
            try {
                let resp = await getApi<IPeople>('peoples');
                setPeoples((prevState) => ({
                    ...prevState, 
                    ...resp.data,
                }))
                
            } catch (error) {
                console.error(error)
            } finally {
                // Possivel loading
            }
        }
        onMount();
    }, [])


    // const data = new Churrasco(10,10,10);
    // console.log(data.calcularTodos())


  



    const fakeData = [
        {
            id: 1,
            date: '2024-03-04',
            people: 10,
            meat: 'Churrasco de carne de boi',
            garlicBread: 'Pão de alho tradicional',
            charcoal: 'Carvão vegetal',
            soda: 'Refrigerante de cola',
            beer: 'Cerveja Pilsen',
        },
        {
            id: 2,
            date: '2024-03-05',
            people: 8,
            meat: 'Churrasco de frango',
            garlicBread: 'Pão de alho com queijo',
            charcoal: 'Carvão de eucalipto',
            soda: 'Refrigerante de guaraná',
            beer: 'Cerveja IPA',
        },
        {
            id: 3,
            date: '2024-03-06',
            people: 12,
            meat: 'Churrasco misto',
            garlicBread: 'Pão de alho caseiro',
            charcoal: 'Carvão de carvalho',
            soda: 'Refrigerante de limão',
            beer: 'Cerveja Stout',
        },
    ];

    return (
        <div>
            <Table data={fakeData} />
        </div>
    )
}