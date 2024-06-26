import { AddCollection } from "../../../../../controller/fileUpload";
import ChooseFile from "../../../../../components/choosefile";
type PostPageProps = {
    params: {
        id: string;
    };
};
export default async function Fiels({ params }: PostPageProps) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <ChooseFile params={{
                    id: "" as string,
                    collectionname: "" as string,
                    filename: "" as string,
                    SetFile : AddCollection,
                    valid: "" as string
                }}/>
        </div>
    );
}
