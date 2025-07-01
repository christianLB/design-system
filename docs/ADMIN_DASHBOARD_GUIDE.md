# Guía de Implementación: Dashboard Administrativo

Esta guía te ayudará a construir un dashboard administrativo profesional utilizando los componentes del design system, basado en el `VisualMockup` de ejemplo.

## 🎯 Descripción General

El dashboard administrativo consta de:
- **Header simplificado** con 3 regiones (logo, navegación, acciones)
- **Sidebar** con navegación jerárquica
- **Área principal** con métricas, tablas y formularios
- **Componentes especializados** para datos y estados

## 📦 Componentes Requeridos

### Componentes Básicos (Existentes)
```tsx
import {
  AppLayout,
  SimpleHeader,
  Sidebar,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  DataTable,
  Button,
  Input,
  Stack,
  Grid,
  Text,
  Heading,
  Icon,
  Alert
} from '@tu-design-system';
```

### Componentes Especializados (Nuevos)
```tsx
import {
  StatusBadge,
  MetricCard,
  NotificationBadge,
  StatusIndicator,
  FormSection
} from '@tu-design-system';
```

## 🏗️ Estructura Base

### 1. Layout Principal
```tsx
function AdminDashboard() {
  return (
    <div data-theme="futuristic" className="futuristic-wrap">
      <div className="futuristic-bg" />
      <AppLayout
        sidebar={<DashboardSidebar />}
        header={<DashboardHeader />}
        className="bg-background"
      >
        <DashboardContent />
      </AppLayout>
    </div>
  );
}
```

### 2. Header Simplificado
```tsx
function DashboardHeader() {
  const [notifications, setNotifications] = useState(3);
  
  return (
    <SimpleHeader
      left={
        <Stack direction="row" align="center" gap="sm">
          <Icon name="Zap" size="lg" />
          <Text weight="bold" className="text-lg">MiApp</Text>
        </Stack>
      }
      navigation={[
        { label: 'Dashboard', href: '#', active: true },
        { label: 'Analytics', href: '#/analytics' },
        { label: 'Users', href: '#/users' },
        { label: 'Settings', href: '#/settings' },
      ]}
      right={
        <Stack direction="row" gap="sm">
          <NotificationBadge count={notifications}>
            <Button variant="ghost" size="sm">
              <Icon name="Bell" size="sm" />
            </Button>
          </NotificationBadge>
          <Button variant="primary" size="sm" iconStart="User">
            Profile
          </Button>
        </Stack>
      }
    />
  );
}
```

### 3. Sidebar de Navegación
```tsx
function DashboardSidebar() {
  const sidebarItems = [
    { 
      label: 'Dashboard', 
      href: '#dashboard', 
      icon: <Icon name="Home" size="sm" /> 
    },
    { 
      label: 'Analytics', 
      href: '#analytics', 
      icon: <Icon name="BarChart2" size="sm" />,
      items: [
        { label: 'Overview', href: '#analytics/overview' },
        { label: 'Reports', href: '#analytics/reports' },
      ]
    },
    // ... más items
  ];

  return <Sidebar items={sidebarItems} />;
}
```

## 📊 Sección de Métricas

### MetricCard - Componente Principal
```tsx
function MetricsSection() {
  const metrics = [
    {
      title: 'Total Users',
      value: 12847,
      change: 12.5,
      icon: 'Users',
      status: 'success'
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: -3.4,
      icon: 'DollarSign', 
      status: 'warning'
    }
  ];

  return (
    <Grid columns={4} gap="md">
      {metrics.map((metric, i) => (
        <MetricCard
          key={i}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
          status={metric.status}
          trend={metric.change > 0 ? 'up' : 'down'}
          showGlow={metric.status === 'success'}
        />
      ))}
    </Grid>
  );
}
```

### Configuración de MetricCard
- **title**: Texto descriptivo de la métrica
- **value**: Valor principal (string o número)
- **change**: Porcentaje de cambio (opcional)
- **icon**: Icono representativo
- **status**: `'success' | 'warning' | 'error' | 'neutral'`
- **trend**: `'up' | 'down' | 'stable'`
- **showGlow**: Efecto de brillo para métricas positivas

## 🏥 Indicadores de Estado

### StatusIndicator - Estados del Sistema
```tsx
function SystemHealth() {
  const [systemStatus, setSystemStatus] = useState('online');
  
  return (
    <Card>
      <CardHeader>
        <Stack direction="row" align="center" justify="between">
          <CardTitle>System Health</CardTitle>
          <StatusIndicator 
            status={systemStatus}
            withLabel
            animated
          />
        </Stack>
      </CardHeader>
    </Card>
  );
}
```

### StatusBadge - Estados en Tabla
```tsx
const columns = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <StatusBadge 
        variant={getStatusVariant(row.original.status)}
        size="sm"
      >
        {row.original.status}
      </StatusBadge>
    )
  }
];

function getStatusVariant(status) {
  switch(status) {
    case 'Active': return 'success';
    case 'Inactive': return 'warning';
    case 'Blocked': return 'error';
    default: return 'neutral';
  }
}
```

## 📋 Tablas con Paginación

### DataTable Completa
```tsx
function UsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(allData.length / itemsPerPage);
  
  // Calcular datos de página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = allData.slice(startIndex, endIndex);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Users</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable 
          columns={columns}
          data={currentData}
          striped
          hover
          rowActions={(row) => (
            <Stack direction="row" gap="xs">
              <Button variant="ghost" size="sm">
                <Icon name="Edit" size="sm" />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Trash" size="sm" />
              </Button>
            </Stack>
          )}
          pagination={{
            currentPage,
            pageCount: totalPages,
            itemsPerPage,
            onPageChange: setCurrentPage,
          }}
        />
      </CardContent>
      <CardFooter>
        <Text size="sm" color="subtle">
          Showing {startIndex + 1}-{Math.min(endIndex, allData.length)} of {allData.length} users
        </Text>
      </CardFooter>
    </Card>
  );
}
```

## 📝 Formularios Organizados

### FormSection - Agrupación de Campos
```tsx
function UserForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Stack gap="md">
          {/* Campos básicos */}
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter username" />
          </div>
          
          {/* Sección agrupada */}
          <FormSection 
            title="Security Settings"
            description="Configure your account security"
          >
            <Stack direction="row" gap="md" wrap>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <Text size="sm">Two-factor authentication</Text>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <Text size="sm">Email notifications</Text>
              </label>
            </Stack>
          </FormSection>
        </Stack>
      </CardContent>
    </Card>
  );
}
```

## 🎨 Tema Futuristic

### Aplicación del Tema
```tsx
// Wrapper principal
<div data-theme="futuristic" className="futuristic-wrap">
  <div className="futuristic-bg" />
  {/* Contenido */}
</div>
```

### Variables CSS Disponibles
```css
/* Usadas automáticamente por los componentes */
--background
--foreground  
--primary
--success
--warning
--destructive
--border
--muted
```

## 📱 Responsividad

### Breakpoints del Sistema
- **sm**: 640px
- **md**: 768px  
- **lg**: 1024px
- **xl**: 1280px

### Adaptaciones Móviles
```tsx
// Grid responsivo
<Grid columns={{ base: 1, md: 2, lg: 4 }} gap="md">
  {/* Contenido */}
</Grid>

// Stack responsivo
<Stack direction={{ base: 'column', md: 'row' }} gap="md">
  {/* Contenido */}
</Stack>
```

## ⚡ Mejores Prácticas

### 1. Estructura de Datos
```tsx
// Ejemplo de estructura para métricas
interface Metric {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  status: 'success' | 'warning' | 'error' | 'neutral';
  icon: string;
}

// Ejemplo para datos de tabla
interface TableRow {
  id: string | number;
  [key: string]: any;
}
```

### 2. Gestión de Estado
```tsx
// Estados comunes del dashboard
const [isLoading, setIsLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [systemStatus, setSystemStatus] = useState('online');
const [notifications, setNotifications] = useState(0);
```

### 3. Animaciones
```tsx
// Usar motion para entrada suave
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.5 }}
>
  {/* Contenido */}
</motion.div>
```

### 4. Accesibilidad
```tsx
// Siempre incluir labels apropiados
<Label htmlFor="input-id">Campo requerido</Label>
<Input id="input-id" aria-describedby="help-text" />

// Estados de carga accesibles
<Button disabled={isLoading} aria-label={isLoading ? 'Cargando...' : 'Guardar'}>
  {isLoading ? 'Guardando...' : 'Guardar'}
</Button>
```

## 🚀 Checklist de Implementación

### ✅ Componentes Base
- [ ] AppLayout configurado
- [ ] SimpleHeader con 3 regiones
- [ ] Sidebar con navegación
- [ ] Tema futuristic aplicado

### ✅ Métricas y Datos
- [ ] MetricCard para estadísticas clave
- [ ] StatusIndicator para estado del sistema
- [ ] DataTable con paginación
- [ ] StatusBadge en celdas de tabla

### ✅ Formularios
- [ ] FormSection para agrupación
- [ ] Validación visual de campos
- [ ] Estados de carga en botones

### ✅ UX/UI
- [ ] NotificationBadge en header
- [ ] Animaciones de entrada
- [ ] Responsividad en grids
- [ ] Accesibilidad completa

## 📚 Recursos Adicionales

- **Storybook**: Ver componentes individuales
- **Theme Guide**: Documentación del tema futuristic
- **Animation Guide**: Presets de motion
- **Accessibility**: Guía de accesibilidad

---

Con esta guía y los componentes del design system, puedes construir dashboards administrativos profesionales y consistentes. Todos los patrones están probados y optimizados para rendimiento y usabilidad.