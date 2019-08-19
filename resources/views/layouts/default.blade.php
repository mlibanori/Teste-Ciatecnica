<!DOCTYPE html>
<html>

<head>
    @include('includes.head')
</head>

<body ng-app="ciatecnicaApp" class="hold-transition skin-yellow sidebar-mini ">
    <!-- Site wrapper -->
    <div class="wrapper">
        @include('includes.header')
        @include('includes.sidebar')







        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            @yield('content')

        </div>
        <!-- /.content-wrapper -->

        <footer class="main-footer">
            <strong>CiaTénica</strong>
        </footer>
    </div>
    <!-- ./wrapper -->

    <!-- jQuery 3 -->
    <script src="/vendor/jquery/jquery.min.js"></script>
    <!-- Bootstrap 3.3.7 -->
    <script src="/vendor/bootstrap/js/bootstrap.min.js"></script>
    <!-- SlimScroll -->
    <script src="/vendor/jquery-slimscroll/jquery.slimscroll.min.js"></script>
    <!-- AdminLTE App -->
    <script src="/vendor/adminlte/js/adminlte.min.js"></script>
    <!-- AdminLTE for demo purposes -->
    <script>
        
        $(document).ready(function() {
            $('.sidebar-menu').tree()
        })
    </script>

<script src="/vendor/angular.min.js"></script>
<script src="/vendor/angular-route.min.js"></script>
<script src="/vendor/angular-resource.min.js"></script>
<script src="/vendor/angular-input-masks-standalone.min.js"></script>
@yield('script')
</body>

</html>