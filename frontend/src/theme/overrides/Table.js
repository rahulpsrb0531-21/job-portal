
export default function Table(theme){
    return{
        MuiTable:{
            styleOverrides:{
                root: {
                    
                  },
                
            }
        },
        MuiTableHead: {
            styleOverrides: {
              root: {
                background:"#F7F7F7",
                marginBottom:12
              },
              
            },
        },
        MuiTableBody: {
            styleOverrides: {
              root: {
                // paddingTop:12
              },
            },
        },
        MuiTableCell: {
            styleOverrides: {
              root: {
                padding:"16px 32px",
              },
              body:{
                borderBottom:"none",
                "&:first-child":{
                    // padding:"24px 32px",
                }
              },
              head:{
                padding:"16px 32px",
                fontSize:14,
                fontWeight:400,
                color:"#B0B0B0",
                lineHeight:1.5    
              }
            },
        },
        MuiPaginationItem: {
            styleOverrides: {
              root:{
                "&.Mui-selected":{
                    backgroundColor:theme.palette.primary.main,
                    color:"white",
                    '&:hover': {
                        backgroundColor: "#B8CAF2",
                    }
                },
                '&:hover': {
                    backgroundColor: "#B8CAF2",
                }
              },
              page: {
                // paddingTop:12,
                backgroundColor:theme.palette.primary.light,
                color:theme.palette.primary.main
              },
            },
        },
    }
}