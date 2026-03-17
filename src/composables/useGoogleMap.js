import { ref, computed } from 'vue'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'

export function useGoogleMap(options = {}) {
  const { t } = useI18n()
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY
  const isLoading = ref(true)
  const error = ref(null)
  const markers = ref([])
  const currentPosition = ref(null)

  // 新加坡中心坐标
  const center = computed(() => options.center || { lat: 1.3521, lng: 103.8198 })
  
  // 新加坡边界
  const SINGAPORE_BOUNDS = {
    north: 1.4504,
    south: 1.2500,
    east: 104.0300,
    west: 103.6000
  }

  // 地图配置
  const mapOptions = {
    zoom: options.zoom || 11,
    restriction: {
      latLngBounds: SINGAPORE_BOUNDS,
      strictBounds: false
    },
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: true,
    fullscreenControl: false,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  }

  // 标记点配置
  const markerOptions = {
    // animation: 2, // DROP
    // clickable: true
  }

  // 当前位置标记配置
  const currentLocationMarker = {
    icon: {
      path: 0, // CIRCLE
      scale: 10,
      fillColor: '#4285F4',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 2
    }
  }

  // 添加标记
  const addMarkers = (markerData = []) => {
    try {
      markers.value = markerData.map(data => ({
        ...markerOptions,
        position: data.position,
        title: data.title,
      }))
      isLoading.value = false
    } catch (err) {
      error.value = t('components.googleMap.errors.addMarkersFailed')
      showToast(t('components.googleMap.errors.addMarkersFailed'))
      console.error(t('components.googleMap.errors.addMarkersError'), err)
    }
  }

  // 定位当前位置
  const locateCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          currentPosition.value = pos
        },
        () => {
          showToast(t('components.googleMap.errors.locationFailed'))
        }
      )
    } else {
      showToast(t('components.googleMap.errors.browserNotSupported'))
    }
  }

  // 创建信息窗口内容
  const createInfoContent = (data) => t('components.googleMap.infoWindow.content', {
    title: data.title,
    address: data.address || ''
  })

  return {
    apiKey,
    center,
    mapOptions,
    markers,
    currentPosition,
    currentLocationMarker,
    isLoading,
    error,
    addMarkers,
    locateCurrentPosition,
    createInfoContent
  }
}
