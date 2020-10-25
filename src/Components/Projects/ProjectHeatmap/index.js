import React,{useEffect, useState} from 'react'
import {ActivityIndicator,View,Text, StyleSheet} from 'react-native'

function DataIcon(props){
    console.log(props)
    return(
        <View>
            <Text>
            {/* {props} */}
            hi
            </Text>
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
            var tdata = []
            res.forEach((element) => {
                var uri = element.url + "/stats/commit_activity";
                fetch({uri})
                .then(data => data.json())
                .then(data => tdata.push(data))
                .catch(error => console.log(error))
            })
            return tdata;
        })
        .then(data => setdata(data))
        .catch((error)=> console.log(error, "unable to fetch repo data"))
        .finally(()=> setisLoading(false))
        
        
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
