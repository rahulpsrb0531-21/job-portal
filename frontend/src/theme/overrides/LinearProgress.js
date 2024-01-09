
export default function LinearProgress(theme){
    return{
        MuiLinearProgress:{
            styleOverrides:{
                root: {
                    height:"12px",
                    borderRadius:"15px",
                    backgroundColor:"#F7F7F7"
                  },
                bar:{
                    // backgroundColor:theme.palette.success.main,
                    borderRadius:"15px"
                }
            }
        }
    }
}