import { ref, computed, onMounted, watch } from "vue";

const RECENT_XSLT_KEY = "recentXSLT";
const RECENT_XML_KEY = "recentXml";

const _recentXslt = ref<string>(`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes" encoding="UTF-8"/>
    
    <!-- Group users by roles -->
    <xsl:key name="roles" match="user" use="role"/>

    <xsl:template match="/">
        <groupedUsers>
            <!-- Loop through unique roles -->
            <xsl:for-each select="users/user[generate-id() = generate-id(key('roles', role)[1])]">
                <roleGroup>
                    <role><xsl:value-of select="role"/></role>
                    <users>
                        <!-- Select all users for the current role -->
                        <xsl:for-each select="key('roles', role)">
                            <user>
                                <name><xsl:value-of select="name"/></name>
                                <email><xsl:value-of select="email"/></email>
                            </user>
                        </xsl:for-each>
                    </users>
                </roleGroup>
            </xsl:for-each>
        </groupedUsers>
    </xsl:template>
</xsl:stylesheet>
`);

const _recentXml = ref<string>(`<?xml version="1.0" encoding="UTF-8"?>
<users>
    <user>
        <id>1</id>
        <name>John Doe</name>
        <email>john.doe@example.com</email>
        <role>Admin</role>
    </user>
    <user>
        <id>2</id>
        <name>Jane Smith</name>
        <email>jane.smith@example.com</email>
        <role>User</role>
    </user>
    <user>
        <id>3</id>
        <name>Bob Johnson</name>
        <email>bob.johnson@example.com</email>
        <role>Admin</role>
    </user>
    <user>
        <id>4</id>
        <name>Alice Brown</name>
        <email>alice.brown@example.com</email>
        <role>User</role>
    </user>
</users>
`);

const _resultXml = ref<string>(``);

function prettyPrintXML(xmlString: string) {
  try {
      // Parse the XML string into a DOM object
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "application/xml");

      // Check for XML parsing errors
      if (xmlDoc.getElementsByTagName("parsererror").length) {
          throw new Error("Invalid XML format");
      }

      // Serialize the XML back into a string with formatting
      const serializer = new XMLSerializer();
      const xmlText = serializer.serializeToString(xmlDoc);

      // Add proper indentation
      const formatted = xmlText
          .replace(/(>)(<)(\/*)/g, "$1\n$2$3") // Add newlines between tags
          .split("\n")
          .map((line, index, lines) => {
              const indentLevel = lines
                  .slice(0, index)
                  .filter(l => l.match(/<[^/?!][^>]*?>/)).length - 
                  lines
                  .slice(0, index)
                  .filter(l => l.match(/<\/[^>]+?>/)).length;

              return '  '.repeat(Math.max(indentLevel, 0)) + line;
          })
          .join("\n");

      return formatted;
  } catch (error) {
    console.error("Error parsing XML:", error);
      return xmlString; // Return the original string if there's an error
  }
}

export const useXLSTStore = () => {
  // Recent XML payload logic
  const recentXml = computed(() => _recentXml.value);
  const setRecentXml = (value: string) => {
    localStorage.setItem(RECENT_XML_KEY, value);
    _recentXml.value = value;
  };

  const initRecentXml = () => {
    if (localStorage.getItem(RECENT_XML_KEY)) {
      setRecentXml(localStorage.getItem(RECENT_XML_KEY) as string);
    }
  };

  // Recent query logic
  const recentXslt = computed(() => _recentXslt.value);
  const setRecentXslt = (value: string | undefined) => {
    if (value !== undefined) {
      localStorage.setItem(RECENT_XSLT_KEY, value);
      _recentXslt.value = value;
    } else {
      localStorage.removeItem(RECENT_XSLT_KEY);
      _recentXslt.value = "";
    }
  };

  const initRecentXslt = () => {
    if (localStorage.getItem(RECENT_XSLT_KEY)) {
      setRecentXslt(localStorage.getItem(RECENT_XSLT_KEY) as string);
    }
  };

  // Calculation logic
  const resultXml = computed(() => _resultXml.value);
  const setResultXml = (value: string) => {
    _resultXml.value = value;
  };
  const processXmlXslt = async (xml: string, xslt: string) => {
    try {

      // Create XML document from string
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'text/xml');
      const xsltDoc = parser.parseFromString(xslt, 'text/xml');

      // Create XSLT processor
      const processor = new XSLTProcessor();
      processor.importStylesheet(xsltDoc);

      // Transform the document
      const resultDoc = processor.transformToDocument(xmlDoc);
      
      // Convert result to string
      const serializer = new XMLSerializer();
      const resultString = serializer.serializeToString(resultDoc);

      console.log('Raw transformation result:', resultString);
      return prettyPrintXML(resultString);
    } catch (error) {
      console.error('XSLT Processing Error:', error);
      throw error;
    }
  };

  watch(
    () => recentXml.value,
    () => {
      processXmlXslt(recentXml.value, recentXslt.value).then((result) => {
        setResultXml(result);
      });
    }
  );

  watch(
    () => recentXslt.value,
    () => {
      processXmlXslt(recentXml.value, recentXslt.value).then((result) => {
        setResultXml(result);
      });
    }
  );

  onMounted(() => {
    initRecentXslt();
    initRecentXml();
    processXmlXslt(_recentXml.value, _recentXslt.value).then((result) => {
      setResultXml(result);
    });
  });

  return {
    resultXml,
    recentXml,
    setRecentXml,
    recentXslt,
    setRecentXslt
  };
};