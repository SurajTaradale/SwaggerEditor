import Link from "next/link";
import { UpdateCollections, GetCollections } from "../../../../../controller/fileUpload";
import ChooseFile from "../../../../../components/choosefile";
type PostPageProps = {
    params: {
        id: string;
    };
};
export default async function Fiels({ params }: PostPageProps) {
    const response = await GetCollections({
        fileid: params.id as string, // Provide the appropriate file ID here
        filelist: false,
    });
  
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <ChooseFile params={{
                    id: response.file._id.toString() as string,
                    collectionname: response.file.collectionname as string,
                    filename: response.file.filename as string,
                    SetFile : UpdateCollections,
                    valid: response.file.valid as string
                }}/>
        </div>
    );
}
