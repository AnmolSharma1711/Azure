// AZ-900 Azure Fundamentals Questions - 50 Questions to balance with AI-900
export const az900Questions = [
  {
    id: 'az900_basic_1',
    question: 'What is Microsoft Azure?',
    type: 'mcq',
    options: [
      'A. A cloud computing platform',
      'B. A database management system',
      'C. An operating system',
      'D. A programming language'
    ],
    correct_answer: 'A',
    explanation: 'Microsoft Azure is a comprehensive cloud computing platform that provides various services including computing, analytics, storage, and networking.',
    category: 'Cloud Concepts',
    difficulty: 'easy',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_2',
    question: 'Which Azure service is used for hosting web applications?',
    type: 'mcq',
    options: [
      'A. Azure Virtual Machines',
      'B. Azure App Service',
      'C. Azure Storage',
      'D. Azure SQL Database'
    ],
    correct_answer: 'B',
    explanation: 'Azure App Service is a fully managed platform for building, deploying, and scaling web apps.',
    category: 'Azure Services',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_3',
    question: 'Which Azure service provides Infrastructure as a Service (IaaS)?',
    type: 'mcq',
    options: [
      'A. Azure Functions',
      'B. Azure App Service',
      'C. Azure Virtual Machines',
      'D. Azure SQL Database'
    ],
    correct_answer: 'C',
    explanation: 'Azure Virtual Machines provide Infrastructure as a Service (IaaS) by offering virtualized computing resources.',
    category: 'Cloud Service Types',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_4',
    question: 'What is the benefit of using Azure Resource Groups?',
    type: 'mcq',
    options: [
      'A. They provide backup services',
      'B. They organize and manage related Azure resources',
      'C. They increase application performance',
      'D. They reduce costs automatically'
    ],
    correct_answer: 'B',
    explanation: 'Resource Groups are logical containers that help organize and manage related Azure resources together.',
    category: 'Resource Management',
    difficulty: 'easy',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_5',
    question: 'Which Azure service provides Platform as a Service (PaaS)?',
    type: 'mcq',
    options: [
      'A. Azure Virtual Machines',
      'B. Azure Storage',
      'C. Azure App Service',
      'D. Azure Virtual Network'
    ],
    correct_answer: 'C',
    explanation: 'Azure App Service is a Platform as a Service (PaaS) offering that provides a managed environment for hosting applications.',
    category: 'Cloud Service Types',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_6',
    question: 'What is Azure Active Directory used for?',
    type: 'mcq',
    options: [
      'A. File storage',
      'B. Identity and access management',
      'C. Virtual machine hosting',
      'D. Database management'
    ],
    correct_answer: 'B',
    explanation: 'Azure Active Directory is a cloud-based identity and access management service.',
    category: 'Security',
    difficulty: 'easy',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_7',
    question: 'Which Azure storage type is best for storing unstructured data like images and videos?',
    type: 'mcq',
    options: [
      'A. Azure SQL Database',
      'B. Azure Table Storage',
      'C. Azure Blob Storage',
      'D. Azure File Storage'
    ],
    correct_answer: 'C',
    explanation: 'Azure Blob Storage is optimized for storing large amounts of unstructured data such as images, videos, and documents.',
    category: 'Storage Services',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_8',
    question: 'What is the Azure Service Level Agreement (SLA)?',
    type: 'mcq',
    options: [
      'A. A pricing model for Azure services',
      'B. A commitment to service availability and performance',
      'C. A security protocol for Azure',
      'D. A backup strategy for Azure resources'
    ],
    correct_answer: 'B',
    explanation: 'An SLA is a commitment between Microsoft and customers regarding service availability and performance levels.',
    category: 'Azure SLA',
    difficulty: 'easy',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_9',
    question: 'Which Azure service provides serverless computing?',
    type: 'mcq',
    options: [
      'A. Azure Virtual Machines',
      'B. Azure Functions',
      'C. Azure App Service',
      'D. Azure Container Instances'
    ],
    correct_answer: 'B',
    explanation: 'Azure Functions provides serverless computing, allowing you to run code without managing infrastructure.',
    category: 'Compute Services',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_10',
    question: 'What is the purpose of Azure Virtual Network?',
    type: 'mcq',
    options: [
      'A. To store data',
      'B. To provide secure network connectivity',
      'C. To manage user identities',
      'D. To monitor applications'
    ],
    correct_answer: 'B',
    explanation: 'Azure Virtual Network provides secure network connectivity between Azure resources and on-premises networks.',
    category: 'Networking',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_11',
    question: 'Which Azure service is used for relational database hosting?',
    type: 'mcq',
    options: [
      'A. Azure Cosmos DB',
      'B. Azure Blob Storage',
      'C. Azure SQL Database',
      'D. Azure Table Storage'
    ],
    correct_answer: 'C',
    explanation: 'Azure SQL Database is a managed relational database service based on Microsoft SQL Server.',
    category: 'Database Services',
    difficulty: 'easy',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_12',
    question: 'What is the Azure pricing calculator used for?',
    type: 'mcq',
    options: [
      'A. To calculate server performance',
      'B. To estimate Azure service costs',
      'C. To measure network bandwidth',
      'D. To assess security risks'
    ],
    correct_answer: 'B',
    explanation: 'The Azure pricing calculator helps estimate the cost of Azure services before deployment.',
    category: 'Cost Management',
    difficulty: 'easy',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_13',
    question: 'Which cloud deployment model allows organizations to keep sensitive data on-premises while using cloud services?',
    type: 'mcq',
    options: [
      'A. Public cloud',
      'B. Private cloud',
      'C. Hybrid cloud',
      'D. Community cloud'
    ],
    correct_answer: 'C',
    explanation: 'Hybrid cloud combines on-premises infrastructure with cloud services, allowing sensitive data to remain on-premises.',
    category: 'Cloud Concepts',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_14',
    question: 'What is Azure Monitor used for?',
    type: 'mcq',
    options: [
      'A. Managing user permissions',
      'B. Monitoring and analyzing Azure resources',
      'C. Storing application data',
      'D. Creating virtual networks'
    ],
    correct_answer: 'B',
    explanation: 'Azure Monitor provides comprehensive monitoring and analytics for Azure resources and applications.',
    category: 'Monitoring',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_15',
    question: 'Which Azure service provides NoSQL database capabilities?',
    type: 'mcq',
    options: [
      'A. Azure SQL Database',
      'B. Azure Cosmos DB',
      'C. Azure MySQL',
      'D. Azure PostgreSQL'
    ],
    correct_answer: 'B',
    explanation: 'Azure Cosmos DB is a globally distributed NoSQL database service.',
    category: 'Database Services',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_16',
    question: 'What is the difference between CapEx and OpEx in cloud computing?',
    type: 'mcq',
    options: [
      'A. CapEx is ongoing operational costs, OpEx is upfront capital investment',
      'B. CapEx is upfront capital investment, OpEx is ongoing operational costs',
      'C. Both are the same type of costs',
      'D. CapEx applies only to hardware, OpEx only to software'
    ],
    correct_answer: 'B',
    explanation: 'CapEx (Capital Expenditure) is upfront investment in physical infrastructure, while OpEx (Operational Expenditure) refers to ongoing operational costs.',
    category: 'Cloud Economics',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_17',
    question: 'Which Azure service provides content delivery network (CDN) capabilities?',
    type: 'mcq',
    options: [
      'A. Azure Traffic Manager',
      'B. Azure CDN',
      'C. Azure Load Balancer',
      'D. Azure Application Gateway'
    ],
    correct_answer: 'B',
    explanation: 'Azure CDN provides content delivery network capabilities to cache content closer to users globally.',
    category: 'Networking',
    difficulty: 'easy',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_18',
    question: 'What is Azure Key Vault used for?',
    type: 'mcq',
    options: [
      'A. Storing virtual machines',
      'B. Managing secrets, keys, and certificates',
      'C. Monitoring applications',
      'D. Creating resource groups'
    ],
    correct_answer: 'B',
    explanation: 'Azure Key Vault securely stores and manages secrets, encryption keys, and certificates.',
    category: 'Security',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_19',
    question: 'Which Azure service provides distributed denial-of-service (DDoS) protection?',
    type: 'mcq',
    options: [
      'A. Azure Firewall',
      'B. Azure Security Center',
      'C. Azure DDoS Protection',
      'D. Azure Application Gateway'
    ],
    correct_answer: 'C',
    explanation: 'Azure DDoS Protection provides protection against distributed denial-of-service attacks.',
    category: 'Security',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_20',
    question: 'What is the Azure Resource Manager (ARM)?',
    type: 'mcq',
    options: [
      'A. A storage service',
      'B. A deployment and management service',
      'C. A monitoring tool',
      'D. A database service'
    ],
    correct_answer: 'B',
    explanation: 'Azure Resource Manager is the deployment and management service for Azure resources.',
    category: 'Resource Management',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_21',
    question: 'Which Azure service provides load balancing for web applications?',
    type: 'mcq',
    options: [
      'A. Azure Traffic Manager',
      'B. Azure Load Balancer',
      'C. Azure Application Gateway',
      'D. All of the above'
    ],
    correct_answer: 'D',
    explanation: 'All these services provide different types of load balancing: Traffic Manager for DNS-based routing, Load Balancer for network-level distribution, and Application Gateway for application-level load balancing.',
    category: 'Networking',
    difficulty: 'hard',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_22',
    question: 'What is Azure Backup used for?',
    type: 'mcq',
    options: [
      'A. Creating virtual machines',
      'B. Protecting and recovering data',
      'C. Managing user access',
      'D. Monitoring performance'
    ],
    correct_answer: 'B',
    explanation: 'Azure Backup provides secure backup and recovery services for Azure and on-premises data.',
    category: 'Backup and Recovery',
    difficulty: 'easy',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_23',
    question: 'Which Azure service provides container orchestration?',
    type: 'mcq',
    options: [
      'A. Azure Container Instances',
      'B. Azure Kubernetes Service (AKS)',
      'C. Azure App Service',
      'D. Azure Functions'
    ],
    correct_answer: 'B',
    explanation: 'Azure Kubernetes Service (AKS) provides managed Kubernetes container orchestration.',
    category: 'Compute Services',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_24',
    question: 'What is the Azure Trust Center?',
    type: 'mcq',
    options: [
      'A. A billing portal',
      'B. A resource for security, privacy, and compliance information',
      'C. A monitoring dashboard',
      'D. A development tool'
    ],
    correct_answer: 'B',
    explanation: 'The Azure Trust Center provides information about security, privacy, compliance, and transparency.',
    category: 'Compliance',
    difficulty: 'easy',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_basic_25',
    question: 'Which Azure service provides big data analytics?',
    type: 'mcq',
    options: [
      'A. Azure Synapse Analytics',
      'B. Azure SQL Database',
      'C. Azure Storage',
      'D. Azure Monitor'
    ],
    correct_answer: 'A',
    explanation: 'Azure Synapse Analytics provides big data and data warehousing analytics capabilities.',
    category: 'Analytics',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_1',
    question: 'Which Azure service should you use to correlate events from multiple resources into a centralized repository?',
    type: 'mcq',
    options: [
      'A. Azure Monitor',
      'B. Azure Event Hubs',
      'C. Azure Log Analytics',
      'D. Azure Service Bus'
    ],
    correct_answer: 'C',
    explanation: 'Azure Log Analytics collects and analyzes data from multiple sources in a centralized repository.',
    category: 'Monitoring',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_2',
    question: 'What is the maximum number of Azure subscriptions that can be associated with a single Azure AD tenant?',
    type: 'mcq',
    options: [
      'A. 10',
      'B. 100',
      'C. 1000',
      'D. Unlimited'
    ],
    correct_answer: 'D',
    explanation: 'There is no limit to the number of Azure subscriptions that can be associated with a single Azure AD tenant.',
    category: 'Identity Management',
    difficulty: 'hard',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_3',
    question: 'Which Azure service provides a managed Redis cache?',
    type: 'mcq',
    options: [
      'A. Azure Cache for Redis',
      'B. Azure Table Storage',
      'C. Azure Cosmos DB',
      'D. Azure SQL Database'
    ],
    correct_answer: 'A',
    explanation: 'Azure Cache for Redis provides a managed Redis cache service for faster data access.',
    category: 'Database Services',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_4',
    question: 'What is the purpose of Azure Policy?',
    type: 'mcq',
    options: [
      'A. To manage user permissions',
      'B. To enforce organizational standards and compliance',
      'C. To monitor resource performance',
      'D. To backup data'
    ],
    correct_answer: 'B',
    explanation: 'Azure Policy helps enforce organizational standards and assess compliance at scale.',
    category: 'Governance',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_5',
    question: 'Which Azure service provides workflow automation?',
    type: 'mcq',
    options: [
      'A. Azure Functions',
      'B. Azure Logic Apps',
      'C. Azure Automation',
      'D. All of the above'
    ],
    correct_answer: 'D',
    explanation: 'Azure Functions, Logic Apps, and Automation all provide different types of workflow automation capabilities.',
    category: 'Integration',
    difficulty: 'hard',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_6',
    question: 'What is the Azure Well-Architected Framework?',
    type: 'mcq',
    options: [
      'A. A deployment tool',
      'B. A set of guiding tenets for building high-quality solutions',
      'C. A monitoring service',
      'D. A pricing model'
    ],
    correct_answer: 'B',
    explanation: 'The Azure Well-Architected Framework provides principles and practices for building reliable, secure, efficient, and cost-effective solutions.',
    category: 'Architecture',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_7',
    question: 'Which Azure service provides API management capabilities?',
    type: 'mcq',
    options: [
      'A. Azure API Management',
      'B. Azure Application Gateway',
      'C. Azure Front Door',
      'D. Azure Traffic Manager'
    ],
    correct_answer: 'A',
    explanation: 'Azure API Management provides a platform for publishing, securing, transforming, maintaining, and monitoring APIs.',
    category: 'Integration',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_8',
    question: 'What is the difference between Azure Availability Sets and Availability Zones?',
    type: 'mcq',
    options: [
      'A. Availability Sets protect against rack failures, Availability Zones protect against datacenter failures',
      'B. Availability Zones protect against rack failures, Availability Sets protect against datacenter failures',
      'C. They provide the same level of protection',
      'D. Availability Sets are newer than Availability Zones'
    ],
    correct_answer: 'A',
    explanation: 'Availability Sets protect against hardware failures within a datacenter, while Availability Zones protect against datacenter-level failures.',
    category: 'High Availability',
    difficulty: 'hard',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_9',
    question: 'Which Azure service provides messaging between applications and services?',
    type: 'mcq',
    options: [
      'A. Azure Service Bus',
      'B. Azure Event Grid',
      'C. Azure Event Hubs',
      'D. All of the above'
    ],
    correct_answer: 'D',
    explanation: 'Service Bus provides reliable messaging, Event Grid provides event routing, and Event Hubs provides big data streaming - all facilitate messaging between applications.',
    category: 'Integration',
    difficulty: 'hard',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_10',
    question: 'What is Azure Site Recovery used for?',
    type: 'mcq',
    options: [
      'A. Website hosting',
      'B. Disaster recovery and business continuity',
      'C. DNS management',
      'D. SSL certificate management'
    ],
    correct_answer: 'B',
    explanation: 'Azure Site Recovery provides disaster recovery services by replicating workloads to Azure or a secondary site.',
    category: 'Backup and Recovery',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_11',
    question: 'Which Azure service provides Internet of Things (IoT) capabilities?',
    type: 'mcq',
    options: [
      'A. Azure IoT Hub',
      'B. Azure IoT Central',
      'C. Azure IoT Edge',
      'D. All of the above'
    ],
    correct_answer: 'D',
    explanation: 'Azure provides multiple IoT services: IoT Hub for device connectivity, IoT Central for IoT applications, and IoT Edge for edge computing.',
    category: 'IoT',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_12',
    question: 'What is the purpose of Azure Blueprints?',
    type: 'mcq',
    options: [
      'A. To create network diagrams',
      'B. To define repeatable sets of Azure resources',
      'C. To monitor costs',
      'D. To manage user permissions'
    ],
    correct_answer: 'B',
    explanation: 'Azure Blueprints enables cloud architects to define a repeatable set of Azure resources that implements organizational standards.',
    category: 'Governance',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_13',
    question: 'Which Azure service provides serverless event-driven architecture?',
    type: 'mcq',
    options: [
      'A. Azure Functions',
      'B. Azure Event Grid',
      'C. Azure Logic Apps',
      'D. All of the above'
    ],
    correct_answer: 'D',
    explanation: 'Azure Functions, Event Grid, and Logic Apps all support serverless, event-driven architectures in different ways.',
    category: 'Serverless',
    difficulty: 'hard',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_14',
    question: 'What is Azure DevOps used for?',
    type: 'mcq',
    options: [
      'A. Application development and deployment lifecycle management',
      'B. Virtual machine management',
      'C. Database administration',
      'D. Network monitoring'
    ],
    correct_answer: 'A',
    explanation: 'Azure DevOps provides tools for the entire application development and deployment lifecycle.',
    category: 'DevOps',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_15',
    question: 'Which Azure service provides distributed tracing for microservices?',
    type: 'mcq',
    options: [
      'A. Azure Monitor',
      'B. Azure Application Insights',
      'C. Azure Log Analytics',
      'D. Azure Service Map'
    ],
    correct_answer: 'B',
    explanation: 'Azure Application Insights provides distributed tracing capabilities for microservices architectures.',
    category: 'Monitoring',
    difficulty: 'hard',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_16',
    question: 'What is the difference between Azure Security Center and Azure Sentinel?',
    type: 'mcq',
    options: [
      'A. Security Center focuses on prevention, Sentinel focuses on detection and response',
      'B. Security Center focuses on detection, Sentinel focuses on prevention',
      'C. They provide identical capabilities',
      'D. Security Center is for Azure only, Sentinel is for on-premises only'
    ],
    correct_answer: 'A',
    explanation: 'Azure Security Center focuses on security posture management and threat prevention, while Azure Sentinel provides SIEM and SOAR capabilities for detection and response.',
    category: 'Security',
    difficulty: 'hard',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_17',
    question: 'Which Azure service provides global DNS traffic routing?',
    type: 'mcq',
    options: [
      'A. Azure DNS',
      'B. Azure Traffic Manager',
      'C. Azure Load Balancer',
      'D. Azure Application Gateway'
    ],
    correct_answer: 'B',
    explanation: 'Azure Traffic Manager provides DNS-based traffic routing to distribute traffic globally across multiple regions.',
    category: 'Networking',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_18',
    question: 'What is Azure Arc used for?',
    type: 'mcq',
    options: [
      'A. Creating virtual networks',
      'B. Extending Azure management to hybrid and multi-cloud environments',
      'C. Managing storage accounts',
      'D. Monitoring applications'
    ],
    correct_answer: 'B',
    explanation: 'Azure Arc extends Azure management and services to any infrastructure, including on-premises and other clouds.',
    category: 'Hybrid Cloud',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_19',
    question: 'Which Azure service provides managed PostgreSQL database?',
    type: 'mcq',
    options: [
      'A. Azure Database for PostgreSQL',
      'B. Azure SQL Database',
      'C. Azure Cosmos DB',
      'D. Azure MySQL'
    ],
    correct_answer: 'A',
    explanation: 'Azure Database for PostgreSQL provides a fully managed PostgreSQL database service.',
    category: 'Database Services',
    difficulty: 'easy',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_20',
    question: 'What is the purpose of Azure Cost Management and Billing?',
    type: 'mcq',
    options: [
      'A. To create virtual machines',
      'B. To monitor and control Azure spending',
      'C. To manage user access',
      'D. To backup data'
    ],
    correct_answer: 'B',
    explanation: 'Azure Cost Management and Billing helps monitor, analyze, and optimize Azure costs.',
    category: 'Cost Management',
    difficulty: 'easy',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_21',
    question: 'Which Azure service provides real-time analytics on streaming data?',
    type: 'mcq',
    options: [
      'A. Azure Stream Analytics',
      'B. Azure Data Factory',
      'C. Azure Synapse Analytics',
      'D. Azure Data Lake'
    ],
    correct_answer: 'A',
    explanation: 'Azure Stream Analytics provides real-time analytics on streaming data from various sources.',
    category: 'Analytics',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_22',
    question: 'What is Azure Private Link used for?',
    type: 'mcq',
    options: [
      'A. Creating public websites',
      'B. Providing private connectivity to Azure services',
      'C. Managing DNS records',
      'D. Load balancing traffic'
    ],
    correct_answer: 'B',
    explanation: 'Azure Private Link provides private connectivity to Azure services over the Microsoft backbone network.',
    category: 'Networking',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_23',
    question: 'Which Azure service provides managed Apache Spark analytics?',
    type: 'mcq',
    options: [
      'A. Azure HDInsight',
      'B. Azure Databricks',
      'C. Azure Synapse Analytics',
      'D. All of the above'
    ],
    correct_answer: 'D',
    explanation: 'HDInsight, Databricks, and Synapse Analytics all provide managed Apache Spark capabilities with different focuses.',
    category: 'Analytics',
    difficulty: 'hard',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_24',
    question: 'What is the Azure Shared Responsibility Model?',
    type: 'mcq',
    options: [
      'A. A pricing model where costs are shared',
      'B. A security model defining responsibilities between Microsoft and customers',
      'C. A support model for technical issues',
      'D. A deployment model for applications'
    ],
    correct_answer: 'B',
    explanation: 'The Shared Responsibility Model defines which security responsibilities belong to Microsoft versus the customer.',
    category: 'Security',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_intermediate_25',
    question: 'Which Azure service provides managed Kubernetes without needing to manage the control plane?',
    type: 'mcq',
    options: [
      'A. Azure Container Instances',
      'B. Azure Kubernetes Service (AKS)',
      'C. Azure Service Fabric',
      'D. Azure Batch'
    ],
    correct_answer: 'B',
    explanation: 'Azure Kubernetes Service (AKS) provides managed Kubernetes where Microsoft handles the control plane management.',
    category: 'Compute Services',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  }
];
