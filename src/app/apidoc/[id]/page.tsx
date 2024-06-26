import NavbarHeader from '../../../../components/NavBar';
import SwaggerEditorPage from '../../../../components/swagger';
import { GetCollections } from '../../../../controller/fileUpload';
type PostPageProps = {
    params: {
        id: string;
    };
};
export default async function UserProfile({ params }: PostPageProps) {
    const FileData = await GetCollections({
        fileid: params.id,
        filelist: false,
    });
    // const editor = await SwaggerEditor({
    //     dom_id: '#swagger-editor-own',
    //     layout: 'EditorLayout',
    // });
    // editor.specActions.updateSpec(FileData.file.content);
    // console.log(FileData.file.content)
  return (
    <div className="h-screen">
        <NavbarHeader/>
        <SwaggerEditorPage params={{id:params.id, Content:FileData.file.content}}/>
    </div>
  );
}