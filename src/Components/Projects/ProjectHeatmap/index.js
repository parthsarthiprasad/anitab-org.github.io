import React,{useEffect, useState} from 'react'
import {ActivityIndicator,View,Text, StyleSheet} from 'react-native'

function DataIcon({all}){
    console.log(all.length)
    return(
        <View>
            {all}
        </View>
    )
}
function ProjectHeatmap() {
    const [isLoading, setisLoading] = useState(true);
    const [data, setdata] = useState([]);

    useEffect(() => {
        fetch("https://api.github.com/orgs/anitab-org/repos")
        .then(res => res.json())
        .then((res) =>{
            Promise.all(
                res.map(
                    
                    element =>fetch(element.url + "/stats/participation")
                             .then(data =>data.json())
                )
            ).then((datas)=>{setdata(datas)})
            .catch((error)=> console.log(error))
            .finally(()=> setisLoading(false))
        })
        
    }, []);
    
    return (
        <View style={styles.container}>
          {isLoading ? <ActivityIndicator/>:(
            data.map((members) => (
            <DataIcon {...members}  />
            ))
        )}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   width: '100%',
    //   alignItems: 'left',
    },
  });
export default ProjectHeatmap
