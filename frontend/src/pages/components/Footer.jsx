import React from "react";

function FooterComp(){
    return(
        <footer style={styles.footer}>
          <div>
            <p>&copy;2024 Race-001 Kölcsönző.</p>
          </div>
      </footer>
    );
};

const styles = {
    footer: {
      backgroundColor: "#333",
      color: "white",
      position: "fixed",
      textAlign: "center",
      padding: "5px",
      width: "100%",
      bottom: "0",
      zIndex: 10, 
    },
}
export default FooterComp;